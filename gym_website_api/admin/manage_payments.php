<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../config/db.php");

$action = $_POST['action'] ?? '';

switch ($action) {

    case "get":
        try {
            $stmt = $pdo->query("
                SELECT 
                    payments.*, 
                    users.full_name AS user_name, 
                    membership_plans.title AS plan_title
                FROM payments
                LEFT JOIN bookings ON payments.booking_id = bookings.id
                LEFT JOIN users ON bookings.user_id = users.id
                LEFT JOIN membership_plans ON bookings.plan_id = membership_plans.id
                ORDER BY payments.id DESC
            ");
            $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(["status" => "success", "payments" => $payments]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Failed to fetch payments"]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
?>
