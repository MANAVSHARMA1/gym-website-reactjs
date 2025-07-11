<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"));
$user_id = $data->user_id ?? null;

if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "User ID is required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT b.*, p.title, p.duration, p.price
        FROM bookings b
        JOIN membership_plans p ON b.plan_id = p.id
        WHERE b.user_id = ?
        ORDER BY b.booking_date DESC
    ");
    $stmt->execute([$user_id]);
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "bookings" => $bookings]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Fetch failed: " . $e->getMessage()]);
}
