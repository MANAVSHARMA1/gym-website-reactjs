<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"));

$name = $data->name ?? '';
$email = $data->email ?? '';
$phone = $data->phone ?? '';
$message = $data->message ?? '';

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["status" => "error", "message" => "Please fill all required fields"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $message]);
    echo json_encode(["status" => "success", "message" => "Message sent successfully"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Submission failed: " . $e->getMessage()]);
}
