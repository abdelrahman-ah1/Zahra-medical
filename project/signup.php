<?php
// signup.php
session_start();
include "db_conn.php";

header('Content-Type: application/json');

if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email']) && isset($_POST['security_question']) && isset($_POST['security_answer']) && isset($_POST['full_name']) && isset($_POST['phone'])) {

    function validate($data){
        return htmlspecialchars(stripslashes(trim($data)));
    }

    $username = validate($_POST['username']);
    $email = validate($_POST['email']);
    $full_name = validate($_POST['full_name']);
    $phone = validate($_POST['phone']);
    $pass = validate($_POST['password']);
    $security_question = validate($_POST['security_question']);
    $security_answer = validate($_POST['security_answer']);

    if (empty($username) || empty($pass) || empty($email) || empty($security_question) || empty($security_answer) || empty($full_name) || empty($phone)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit();
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE username=? OR email=?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["status" => "error", "message" => "Username or Email already taken"]);
    } else {
        // Hash password and security answer
        $hashed_password = password_hash($pass, PASSWORD_DEFAULT);
        $hashed_answer = password_hash($security_answer, PASSWORD_DEFAULT);

        // Insert new user
        $stmt2 = $conn->prepare("INSERT INTO users(username, email, password, security_question, security_answer, full_name, phone) VALUES(?, ?, ?, ?, ?, ?, ?)");
        $stmt2->bind_param("sssssss", $username, $email, $hashed_password, $security_question, $hashed_answer, $full_name, $phone);

        if ($stmt2->execute()) {
            echo json_encode(["status" => "success", "message" => "Account created successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database error"]);
        }
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>