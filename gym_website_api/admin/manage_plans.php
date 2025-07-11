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

// Handle form-data
$action = $_POST['action'] ?? '';
$id = $_POST['id'] ?? null;

switch ($action) {
    case "get":
        $stmt = $pdo->query("SELECT * FROM membership_plans ORDER BY id DESC");
        $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "plans" => $plans]);
        break;

        case "add":
            try {
                $title = $_POST['title'];
                $description = $_POST['description'];
                $duration = $_POST['duration'];
                $price = $_POST['price'];
                $status = $_POST['status'];
                $image = "";
                if (!empty($_FILES['image']['name'])) {
                    $upload_dir = "../uploads/plans/";
                    $img_name = time() . "_" . basename($_FILES['image']['name']);
                    $target_file = $upload_dir . $img_name;
                
                    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
                        $image = $img_name;
                    } else {
                        echo json_encode([
                            "status" => "error",
                            "message" => "Image upload failed",
                            "debug" => $_FILES['image']
                        ]);
                        exit;
                    }
                }
                
        
        
                $stmt = $pdo->prepare("INSERT INTO membership_plans (title, description, duration, price, image, status) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$title, $description, $duration, $price, $image, $status]);
        
                echo json_encode(["status" => "success", "message" => "Plan added successfully"]);
            } catch (Exception $e) {
                echo json_encode(["status" => "error", "message" => "DB error: " . $e->getMessage()]);
            }
            break;
        
    case "delete":
        $stmt = $pdo->prepare("DELETE FROM membership_plans WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Plan deleted"]);
        break;

        case "update":
            try {
                $id = $_POST['id'];
                $title = $_POST['title'];
                $description = $_POST['description'];
                $duration = $_POST['duration'];
                $price = $_POST['price'];
                $status = $_POST['status'];
                $image = $_POST['existingImage']; // default to existing
        
                if (!empty($_FILES['image']['name'])) {
                    $img_name = time() . "_" . basename($_FILES['image']['name']);
                    $target_file = "../uploads/plans/" . $img_name;
        
                    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
                        $image = $img_name;
                    } else {
                        echo json_encode(["status" => "error", "message" => "Image upload failed"]);
                        exit;
                    }
                }
        
                $stmt = $pdo->prepare("UPDATE membership_plans SET title = ?, description = ?, duration = ?, price = ?, image = ?, status = ? WHERE id = ?");
                $stmt->execute([$title, $description, $duration, $price, $image, $status, $id]);
        
                echo json_encode(["status" => "success", "message" => "Plan updated successfully"]);
            } catch (Exception $e) {
                echo json_encode(["status" => "error", "message" => "Update failed: " . $e->getMessage()]);
            }
            break;
            
    default:
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
