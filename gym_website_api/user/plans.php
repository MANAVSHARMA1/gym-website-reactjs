<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/db.php");

try {
    $stmt = $pdo->prepare("SELECT * FROM membership_plans WHERE status = 'Active' ORDER BY id DESC");
    $stmt->execute();
    $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "plans" => $plans]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to fetch plans: " . $e->getMessage()]);
}
