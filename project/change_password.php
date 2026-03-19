<?php
// change_password.php
session_start();
include "db_conn.php";

header('Content-Type: application/json');

if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['new_password']) && isset($_POST['security_question']) && isset($_POST['security_answer'])) {
    function validate($data)
    {
        return htmlspecialchars(stripslashes(trim($data)));
    }

    $username = validate($_POST['username']);
    $email = validate($_POST['email']);
    $new_pass = validate($_POST['new_password']);
    $security_question = validate($_POST['security_question']);
    $security_answer = validate($_POST['security_answer']);

    if (empty($username) || empty($email) || empty($new_pass) || empty($security_question) || empty($security_answer)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit();
    }

    $stmt = $conn->prepare("SELECT id, security_question, security_answer FROM users WHERE username=? AND email=?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        $user_id = $row['id'];
        $db_question = $row['security_question'];
        $db_answer_hash = $row['security_answer'];

        if ($db_question === $security_question && password_verify($security_answer, $db_answer_hash)) {
            $hashed_password = password_hash($new_pass, PASSWORD_DEFAULT);

            $update_stmt = $conn->prepare("UPDATE users SET password=? WHERE id=?");
            $update_stmt->bind_param("si", $hashed_password, $user_id);

            if ($update_stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Password changed successfully!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update password"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect Security Answer"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid username or email"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>