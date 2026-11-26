<?php
declare(strict_types=1);

require_once __DIR__ . '/conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

function leerEntradaJson(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

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
    $nombre = trim((string)($input['nombre'] ?? ''));
    $apellido = trim((string)($input['apellido'] ?? ''));

    if (($nombre === '' || $apellido === '') && !empty($input['nombre_completo'])) {
        $partes = preg_split('/\s+/', trim((string)$input['nombre_completo']), 2);
        $nombre = $partes[0] ?? '';
        $apellido = $partes[1] ?? 'N/D';
    }

    return [$nombre, $apellido !== '' ? $apellido : 'N/D'];
}

function normalizarSexo(array $input): string {
    $valor = trim((string)($input['sexo'] ?? 'N/D'));
    return in_array($valor, ['Masculino', 'Femenino', 'N/D'], true) ? $valor : 'N/D';
}

function decodificarAsistencias(string|array|null $rawAsistencias): array {
    if (is_array($rawAsistencias)) {
        return $rawAsistencias;
    }
    if (is_string($rawAsistencias) && trim($rawAsistencias) !== '') {
        $decoded = json_decode($rawAsistencias, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }
    return [];
}

if ($method === 'GET') {
    try {
        $sql = "SELECT e.id, e.cedula, e.nombre, e.apellido, e.sexo, e.seccion_id,
                       s.nombre_seccion AS seccion, e.asistencias
                FROM estudiantes e
                INNER JOIN secciones s ON e.seccion_id = s.id
                ORDER BY s.nombre_seccion ASC, e.apellido ASC, e.nombre ASC";
        $estudiantes = $pdo->query($sql)->fetchAll();

        foreach ($estudiantes as &$est) {
            $est['id'] = (int)$est['id'];
            $est['seccion_id'] = (int)$est['seccion_id'];
            $est['sexo'] = $est['sexo'] ?: 'N/D';
            $decoded = decodificarAsistencias($est['asistencias'] ?? null);
            $est['asistencias'] = empty($decoded) ? new stdClass() : $decoded;
        }
        unset($est);

        echo json_encode(['ok' => true, 'estudiantes' => $estudiantes], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'ok' => false,
            'error' => 'Error al consultar estudiantes: ' . $e->getMessage(),
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

if ($method === 'POST') {
    $input = leerEntradaJson();
    $cedula = trim((string)($input['cedula'] ?? ''));
    [$nombre, $apellido] = normalizarNombreApellido($input);
    $sexo = normalizarSexo($input);
    $seccion = trim((string)($input['seccion'] ?? ''));

    if ($cedula === '' || $nombre === '' || $seccion === '') {
        http_response_code(400);
        echo json_encode([
            'ok' => false,
            'error' => 'Cédula, nombre y sección son obligatorios.',
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        $pdo->beginTransaction();
        $seccionId = obtenerOcrearSeccionId($pdo, $seccion);

        $stmt = $pdo->prepare(
            "INSERT INTO estudiantes (cedula, nombre, apellido, sexo, seccion_id, asistencias)
             VALUES (:cedula, :nombre, :apellido, :sexo, :seccion_id, JSON_OBJECT())"
        );
        $stmt->execute([
            ':cedula'     => $cedula,
            ':nombre'     => $nombre,
            ':apellido'   => $apellido,
            ':sexo'       => $sexo,
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
                'sexo' => $sexo,
                'seccion_id' => $seccionId,
                'seccion' => $seccion,
                'asistencias' => new stdClass(),
            ],
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        if ((int)($e->errorInfo[1] ?? 0) === 1062) {
            http_response_code(409);
            echo json_encode([
                'ok' => false,
                'error' => 'Ya existe un estudiante con esa cédula.',
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode([
                'ok' => false,
                'error' => 'Error al guardar: ' . $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }
}

if ($method === 'PUT') {
    $input = leerEntradaJson();
    $id = (int)($input['id'] ?? 0);
    $cedula = trim((string)($input['cedula'] ?? ''));
    [$nombre, $apellido] = normalizarNombreApellido($input);
    $sexo = normalizarSexo($input);
    $seccion = trim((string)($input['seccion'] ?? ''));

    if ($id <= 0 || $cedula === '' || $nombre === '' || $seccion === '') {
        http_response_code(400);
        echo json_encode([
            'ok' => false,
            'error' => 'ID, cédula, nombre y sección son obligatorios.',
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        $pdo->beginTransaction();
        $seccionId = obtenerOcrearSeccionId($pdo, $seccion);

        $stmt = $pdo->prepare(
            "UPDATE estudiantes
             SET cedula = :cedula, nombre = :nombre, apellido = :apellido,
                 sexo = :sexo, seccion_id = :seccion_id
             WHERE id = :id"
        );
        $stmt->execute([
            ':id'         => $id,
            ':cedula'     => $cedula,
            ':nombre'     => $nombre,
            ':apellido'   => $apellido,
            ':sexo'       => $sexo,
            ':seccion_id' => $seccionId,
        ]);

        $check = $pdo->prepare("SELECT id, asistencias FROM estudiantes WHERE id = :id");
        $check->execute([':id' => $id]);
        $actual = $check->fetch();
        if (!$actual) {
            $pdo->rollBack();
            http_response_code(404);
            echo json_encode([
                'ok' => false,
                'error' => 'Estudiante no encontrado.',
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $pdo->commit();
        $decodedAsist = decodificarAsistencias($actual['asistencias'] ?? null);

        echo json_encode([
            'ok' => true,
            'estudiante' => [
                'id' => $id,
                'cedula' => $cedula,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'sexo' => $sexo,
                'seccion_id' => $seccionId,
                'seccion' => $seccion,
                'asistencias' => empty($decodedAsist) ? new stdClass() : $decodedAsist,
            ],
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        if ((int)($e->errorInfo[1] ?? 0) === 1062) {
            http_response_code(409);
            echo json_encode([
                'ok' => false,
                'error' => 'Esa cédula ya pertenece a otro estudiante.',
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode([
                'ok' => false,
                'error' => 'Error al actualizar: ' . $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }
}

if ($method === 'DELETE') {
    $input = leerEntradaJson();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'ID inválido.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM estudiantes WHERE id = :id");
        $stmt->execute([':id' => $id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['ok' => false, 'error' => 'Estudiante no encontrado.'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        echo json_encode(['ok' => true, 'id' => $id], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'ok' => false,
            'error' => 'Error al eliminar: ' . $e->getMessage(),
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

http_response_code(405);
echo json_encode(['ok' => false, 'error' => 'Método no permitido'], JSON_UNESCAPED_UNICODE);