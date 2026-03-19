<?php
// signin.php
session_start();
include "db_conn.php";

header('Content-Type: application/json');

if (isset($_POST['username']) && isset($_POST['password'])) {

    function validate($data){
        return htmlspecialchars(stripslashes(trim($data)));
    }

    $username = validate($_POST['username']);
    $pass = validate($_POST['password']);

    if (empty($username) || empty($pass)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit();
    }

    // Select user data
    $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);

        // Verify the password
        if (password_verify($pass, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            echo json_encode(["status" => "success", "message" => "Login successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid username or password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid username or password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>