<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? null;

if (!$id) {
    echo json_encode(["status" => "error", "message" => "Plan ID is required"]);
    exit;
}

try {
    $stmt1 = $pdo->prepare("SELECT * FROM membership_plans WHERE id = ? AND status = 'Active'");
    $stmt1->execute([$id]);
    $plan = $stmt1->fetch(PDO::FETCH_ASSOC);

    if (!$plan) {
        echo json_encode(["status" => "error", "message" => "Plan not found"]);
        exit;
    }

    $stmt2 = $pdo->prepare("SELECT * FROM membership_plans WHERE id != ? AND status = 'Active' ORDER BY id DESC LIMIT 3");
    $stmt2->execute([$id]);
    $other_plans = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "plan" => $plan,
        "other_plans" => $other_plans
    ]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}
