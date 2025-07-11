<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once("../config/db.php");

$action = $_POST['action'] ?? '';
$id = $_POST['id'] ?? null;

switch ($action) {
    case "get":
        $stmt = $pdo->query("SELECT * FROM gallery ORDER BY id DESC");
        $gallery = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "gallery" => $gallery]);
        break;

    case "add":
        $caption = $_POST['caption'] ?? '';
        $image = "";

        if (!empty($_FILES['image']['name'])) {
            $img_name = time() . "_" . basename($_FILES['image']['name']);
            $upload_path = "../uploads/gallery/" . $img_name;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $upload_path)) {
                $image = $img_name;
            } else {
                echo json_encode(["status" => "error", "message" => "Image upload failed"]);
                exit;
            }
        }

        $stmt = $pdo->prepare("INSERT INTO gallery (image, caption) VALUES (?, ?)");
        $stmt->execute([$image, $caption]);

        echo json_encode(["status" => "success", "message" => "Image added to gallery"]);
        break;

    case "delete":
        $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Image deleted"]);
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
