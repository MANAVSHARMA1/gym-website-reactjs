<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"));

$full_name = $data->full_name ?? '';
$email = $data->email ?? '';
$password = $data->password ?? '';
$phone = $data->phone ?? '';
$gender = $data->gender ?? '';
$dob = $data->dob ?? '';
$address = $data->address ?? '';

if (empty($full_name) || empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "All required fields must be filled"]);
    exit;
}

try {
    $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        echo json_encode(["status" => "error", "message" => "Email already registered"]);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password, phone, gender, dob, address) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$full_name, $email, $hashed_password, $phone, $gender, $dob, $address]);

    echo json_encode(["status" => "success", "message" => "Registration successful"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to register: " . $e->getMessage()]);
}
