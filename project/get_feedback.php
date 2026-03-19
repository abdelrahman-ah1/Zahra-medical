<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "feedback");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

$result = $conn->query("SELECT id, name, message, stars, created_at FROM feedback ORDER BY created_at DESC");

$feedbacks = [];
while ($row = $result->fetch_assoc()) {
    $feedbacks[] = $row;
}

echo json_encode(["success" => true, "feedbacks" => $feedbacks]);

$conn->close();
?>