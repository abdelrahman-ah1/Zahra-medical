<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "feedback");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID is required"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM feedback WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Feedback deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Error deleting feedback"]);
}

$conn->close();
?>