<?php
declare(strict_types=1);

require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido'], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = file_get_contents('php://input');
$input = ($raw !== false && trim($raw) !== '') ? json_decode($raw, true) : [];
if (!is_array($input)) {
    $input = [];
}

$id = (int)($input['id'] ?? 0);
$asistencias = $input['asistencias'] ?? null;

if ($id <= 0 || !is_array($asistencias)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'ID de estudiante y objeto de asistencias requeridos.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE estudiantes SET asistencias = :asistencias WHERE id = :id");
    $stmt->execute([
        ':id' => $id,
        ':asistencias' => json_encode($asistencias, JSON_UNESCAPED_UNICODE),
    ]);

    $check = $pdo->prepare("SELECT id FROM estudiantes WHERE id = :id");
    $check->execute([':id' => $id]);
    if (!$check->fetch()) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Estudiante no encontrado.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode([
        'ok' => true,
        'id' => $id,
        'asistencias' => empty($asistencias) ? new stdClass() : $asistencias,
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Error al guardar asistencias: ' . $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
}