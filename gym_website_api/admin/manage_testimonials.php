<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json");

require_once("../config/db.php");

$action = $_POST['action'] ?? '';

switch ($action) {
    case "get":
        $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY submitted_at DESC");
        $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "testimonials" => $testimonials]);
        break;

    case "add":
        $name = $_POST['name'] ?? '';
        $feedback = $_POST['feedback'] ?? '';
        $image = "";

        if (!empty($_FILES['image']['name'])) {
            $img_name = time() . "_" . $_FILES['image']['name'];
            move_uploaded_file($_FILES['image']['tmp_name'], "../uploads/testimonials/" . $img_name);
            $image = $img_name;
        }

        $stmt = $pdo->prepare("INSERT INTO testimonials (name, feedback, image, status) VALUES (?, ?, ?, 'Approved')");
        $stmt->execute([$name, $feedback, $image]);

        echo json_encode(["status" => "success", "message" => "Testimonial added successfully"]);
        break;

    case "delete":
        $id = $_POST['id'] ?? '';
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Testimonial deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "ID required"]);
        }
        break;

    case "approve":
        $id = $_POST['id'] ?? '';
        if ($id) {
            $stmt = $pdo->prepare("UPDATE testimonials SET status = 'Approved' WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Testimonial approved"]);
        } else {
            echo json_encode(["status" => "error", "message" => "ID required"]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
