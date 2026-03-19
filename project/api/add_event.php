<?php
header('Content-Type: application/json'); // Respond with JSON
include 'db.php';

// Only handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = $_POST['name'] ?? '';
    $date = $_POST['date'] ?? '';

    if ($name && $date) {
        $stmt = $conn->prepare("INSERT INTO events (name, date) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $date);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'name' => $name,
                'date' => $date
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Database error'
            ]);
        }

    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Please fill all fields'
        ]);
    }

} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request'
    ]);
}
?>
