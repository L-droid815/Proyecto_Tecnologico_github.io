<?php
require_once __DIR__ . '/conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

function obtenerOcrearSeccionId(PDO $pdo, string $nombreSeccion): int {
    $stmt = $pdo->prepare("SELECT id FROM secciones WHERE nombre_seccion = :nombre LIMIT 1");
    $stmt->execute([':nombre' => $nombreSeccion]);
    $row = $stmt->fetch();
    if ($row) {
        return (int)$row['id'];
    }

    $ins = $pdo->prepare("INSERT INTO secciones (nombre_seccion) VALUES (:nombre)");
    $ins->execute([':nombre' => $nombreSeccion]);
    return (int)$pdo->lastInsertId();
}

function normalizarNombreApellido(array $input): array {
    $nombre = trim($input['nombre'] ?? '');
    $apellido = trim($input['apellido'] ?? '');
    if (($nombre === '' || $apellido === '') && !empty($input['nombre_completo'])) {
        $partes = preg_split('/\s+/', trim($input['nombre_completo']), 2);
        $nombre = $partes[0] ?? '';
        $apellido = $partes[1] ?? 'N/D';
    }
    return [$nombre, $apellido !== '' ? $apellido : 'N/D'];
}

function normalizarGenero(?string $genero): string {
    $g = trim((string)$genero);
    return in_array($g, ['Masculino', 'Femenino', 'N/D'], true) ? $g : 'N/D';
}

if ($method === 'GET') {
    $sql = "SELECT e.id, e.cedula, e.nombre, e.apellido, e.genero, e.seccion_id,
                   s.nombre_seccion AS seccion, e.asistencias
            FROM estudiantes e
            INNER JOIN secciones s ON e.seccion_id = s.id
            ORDER BY s.nombre_seccion ASC, e.apellido ASC, e.nombre ASC";
    $estudiantes = $pdo->query($sql)->fetchAll();

    foreach ($estudiantes as &$est) {
        $est['asistencias'] = $est['asistencias'] ? json_decode($est['asistencias'], true) : new stdClass();
    }

    echo json_encode(['ok' => true, 'estudiantes' => $estudiantes]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $cedula = trim($input['cedula'] ?? '');
    [$nombre, $apellido] = normalizarNombreApellido($input);
    $genero = normalizarGenero($input['genero'] ?? 'N/D');
    $seccion = trim($input['seccion'] ?? '');

    if ($cedula === '' || $nombre === '' || $seccion === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Cédula, nombre y sección son obligatorios.']);
        exit;
    }

    try {
        $pdo->beginTransaction();
        $seccionId = obtenerOcrearSeccionId($pdo, $seccion);

        $stmt = $pdo->prepare(
            "INSERT INTO estudiantes (cedula, nombre, apellido, genero, seccion_id, asistencias)
             VALUES (:cedula, :nombre, :apellido, :genero, :seccion_id, JSON_OBJECT())"
        );
        $stmt->execute([
            ':cedula'     => $cedula,
            ':nombre'     => $nombre,
            ':apellido'   => $apellido,
            ':genero'     => $genero,
            ':seccion_id' => $seccionId,
        ]);

        $id = (int)$pdo->lastInsertId();
        $pdo->commit();

        http_response_code(201);
        echo json_encode([
            'ok' => true,
            'estudiante' => [
                'id' => $id,
                'cedula' => $cedula,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'genero' => $genero,
                'seccion_id' => $seccionId,
                'seccion' => $seccion,
                'asistencias' => new stdClass(),
            ]
        ]);
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        if ((int)($e->errorInfo[1] ?? 0) === 1062) {
            http_response_code(409);
            echo json_encode(['ok' => false, 'error' => 'Ya existe un estudiante con esa cédula.']);
        } else {
            http_response_code(500);
            echo json_encode(['ok' => false, 'error' => 'Error al guardar: ' . $e->getMessage()]);
        }
    }
    exit;
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $id = (int)($input['id'] ?? 0);
    $cedula = trim($input['cedula'] ?? '');
    [$nombre, $apellido] = normalizarNombreApellido($input);
    $genero = normalizarGenero($input['genero'] ?? 'N/D');
    $seccion = trim($input['seccion'] ?? '');

    if ($id <= 0 || $cedula === '' || $nombre === '' || $seccion === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'ID, cédula, nombre y sección son obligatorios.']);
        exit;
    }

    try {
        $pdo->beginTransaction();
        $seccionId = obtenerOcrearSeccionId($pdo, $seccion);

        $stmt = $pdo->prepare(
            "UPDATE estudiantes
             SET cedula = :cedula, nombre = :nombre, apellido = :apellido,
                 genero = :genero, seccion_id = :seccion_id
             WHERE id = :id"
        );
        $stmt->execute([
            ':id'         => $id,
            ':cedula'     => $cedula,
            ':nombre'     => $nombre,
            ':apellido'   => $apellido,
            ':genero'     => $genero,
            ':seccion_id' => $seccionId,
        ]);

        $check = $pdo->prepare("SELECT id FROM estudiantes WHERE id = :id");
        $check->execute([':id' => $id]);
        if (!$check->fetch()) {
            $pdo->rollBack();
            http_response_code(404);
            echo json_encode(['ok' => false, 'error' => 'Estudiante no encontrado.']);
            exit;
        }

        $pdo->commit();
        echo json_encode([
            'ok' => true,
            'estudiante' => [
                'id' => $id,
                'cedula' => $cedula,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'genero' => $genero,
                'seccion_id' => $seccionId,
                'seccion' => $seccion,
            ]
        ]);
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        if ((int)($e->errorInfo[1] ?? 0) === 1062) {
            http_response_code(409);
            echo json_encode(['ok' => false, 'error' => 'Esa cédula ya pertenece a otro estudiante.']);
        } else {
            http_response_code(500);
            echo json_encode(['ok' => false, 'error' => 'Error al actualizar: ' . $e->getMessage()]);
        }
    }
    exit;
}

if ($method === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'ID inválido.']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM estudiantes WHERE id = :id");
    $stmt->execute([':id' => $id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Estudiante no encontrado.']);
        exit;
    }

    echo json_encode(['ok' => true, 'id' => $id]);
    exit;
}

http_response_code(405);
echo json_encode(['ok' => false, 'error' => 'Método no permitido']);