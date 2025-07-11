<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"));
$user_id = $data->user_id ?? '';
$plan_id = $data->plan_id ?? '';
$payment_method = $data->payment_method ?? 'Credit Card';

if (!$user_id || !$plan_id) {
    echo json_encode(["status" => "error", "message" => "Missing required data"]);
    exit;
}

try {
    // 1. Get Plan Price
    $stmt1 = $pdo->prepare("SELECT price FROM membership_plans WHERE id = ?");
    $stmt1->execute([$plan_id]);
    $plan = $stmt1->fetch(PDO::FETCH_ASSOC);
    if (!$plan) {
        echo json_encode(["status" => "error", "message" => "Invalid Plan"]);
        exit;
    }
    $amount_paid = $plan['price'];

    // 2. Insert Booking
    $stmt2 = $pdo->prepare("INSERT INTO bookings (user_id, plan_id, booking_date, payment_status, payment_method) VALUES (?, ?, NOW(), 'Paid', ?)");
    $stmt2->execute([$user_id, $plan_id, $payment_method]);

    // 3. Get Last Insert ID for booking
    $booking_id = $pdo->lastInsertId();

    // 4. Insert Payment
    $stmt3 = $pdo->prepare("INSERT INTO payments (booking_id, amount_paid, payment_mode) VALUES (?, ?, ?)");
    $stmt3->execute([$booking_id, $amount_paid, $payment_method]);

    echo json_encode(["status" => "success", "message" => "Booking and payment recorded successfully"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Transaction failed: " . $e->getMessage()]);
}
