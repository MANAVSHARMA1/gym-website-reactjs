<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json");

require_once("../config/db.php");

try {
    $stmt = $pdo->prepare("SELECT * FROM testimonials WHERE status = 'Approved' ORDER BY submitted_at DESC");
    $stmt->execute();
    $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "testimonials" => $testimonials]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to fetch testimonials: " . $e->getMessage()]);
}
