<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once("../config/db.php");

$action = $_POST['action'] ?? '';

switch ($action) {
    case "get":
        $stmt = $pdo->query("SELECT * FROM contact_messages ORDER BY id DESC");
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "messages" => $messages]);
        break;

    case "delete":
        $id = $_POST['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM contact_messages WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Message deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Message ID required"]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
