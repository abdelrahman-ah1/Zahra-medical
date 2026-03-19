<?php
header("Content-Type: application/json");

// Database credentials
$host = "localhost";
$user = "root";
$password = "";
$dbname = "feedback";

// Connect to database
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

// Get data from JS
$name = $_POST['name'] ?? '';
$message = $_POST['message'] ?? '';
$stars = $_POST['stars'] ?? 0;

// Validation
if ($name == '' || $message == '' || $stars == 0) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

// Insert feedback
$stmt = $conn->prepare(
    "INSERT INTO feedback (name, message, stars) VALUES (?, ?, ?)"
);
$stmt->bind_param("ssi", $name, $message, $stars);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Insert failed"]);
}

$stmt->close();
$conn->close();
?>