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
            $stmt = $pdo->query("SELECT * FROM users ORDER BY created_at DESC");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(["status" => "success", "users" => $users]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Failed to fetch users"]);
        }
        break;

    case "delete":
        try {
            $id = $_POST['id'] ?? null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Invalid User ID"]);
                exit();
            }

            
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$id]);

            echo json_encode(["status" => "success", "message" => "User deleted successfully"]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Failed to delete user"]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
?>
