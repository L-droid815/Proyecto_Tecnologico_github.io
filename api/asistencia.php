<?php
require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?? [];
$id = (int)($input['id'] ?? 0);
$asistencias = $input['asistencias'] ?? null;

if ($id <= 0 || !is_array($asistencias)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'ID de estudiante y objeto de asistencias requeridos.']);
    exit;
}

$stmt = $pdo->prepare("UPDATE estudiantes SET asistencias = :asistencias WHERE id = :id");
$stmt->execute([
    ':id' => $id,
    ':asistencias' => json_encode($asistencias, JSON_UNESCAPED_UNICODE),
]);

echo json_encode(['ok' => true, 'id' => $id, 'asistencias' => $asistencias]);