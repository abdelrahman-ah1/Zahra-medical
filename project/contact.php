<?php

$host = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "zahra_medical";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

// 5. Validate Input
if (
    !empty($data->firstName) &&
    !empty($data->lastName) &&
    !empty($data->phone) &&
    !empty($data->email)
) {
    $sql = "INSERT INTO contacts (first_name, last_name, phone, email, message) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    $stmt->bind_param(
        "sssss", 
        $data->firstName, 
        $data->lastName, 
        $data->phone, 
        $data->email, 
        $data->message
    );

    if ($stmt->execute()) {
        http_response_code(201); // Created
        echo json_encode(["message" => "Thank you! Your message has been saved."]);
    } else {
        http_response_code(503); // Service Unavailable
        echo json_encode(["message" => "Unable to save message. Please try again."]);
    }

    $stmt->close();
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Incomplete data. Please fill all fields."]);
}

$conn->close();
?>