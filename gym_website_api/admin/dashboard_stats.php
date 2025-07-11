<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../config/db.php");

try {
    // Get total users
    $stmt1 = $pdo->query("SELECT COUNT(*) AS total_users FROM users");
    $users = $stmt1->fetch(PDO::FETCH_ASSOC)['total_users'];

    // Get total membership plans
    $stmt2 = $pdo->query("SELECT COUNT(*) AS total_plans FROM membership_plans");
    $plans = $stmt2->fetch(PDO::FETCH_ASSOC)['total_plans'];

    // Get total bookings
    $stmt3 = $pdo->query("SELECT COUNT(*) AS total_bookings FROM bookings");
    $bookings = $stmt3->fetch(PDO::FETCH_ASSOC)['total_bookings'];

    // Get total payments
    $stmt4 = $pdo->query("SELECT COUNT(*) AS total_payments FROM payments");
    $payments = $stmt4->fetch(PDO::FETCH_ASSOC)['total_payments'];

    echo json_encode([
        "status" => "success",
        "stats" => [
            "users" => $users,
            "plans" => $plans,
            "bookings" => $bookings,
            "payments" => $payments
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Error fetching stats: " . $e->getMessage()
    ]);
}
