<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json");

require_once("../config/db.php");

try {
    $stmt = $pdo->query("SELECT * FROM gallery ORDER BY uploaded_at DESC");
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "images" => $images]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to fetch gallery: " . $e->getMessage()]);
}
