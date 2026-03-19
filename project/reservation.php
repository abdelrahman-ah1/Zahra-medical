<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'zahra_db';
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

$check_col = $conn->query("SHOW COLUMNS FROM reservations LIKE 'status'");
if ($check_col && $check_col->num_rows == 0) {
    $conn->query("ALTER TABLE reservations ADD COLUMN status VARCHAR(50) DEFAULT 'Pending'");
}
$method = $_SERVER['REQUEST_METHOD'];
$content_type = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';

// --- API: FETCH (GET) ---
if ($method === 'GET') {
    header('Content-Type: application/json');

    // Fetch all reservations, oldest first
    $sql = "SELECT * FROM reservations ORDER BY timestamp ASC";
    $result = $conn->query($sql);

    $reservations = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {

            $row['date_requested'] = $row['timestamp'];
            $row['status'] = !empty($row['status']) ? $row['status'] : 'Pending';
            $reservations[] = $row;
        }
    }
    echo json_encode($reservations);
    $conn->close();
    exit;
}

// --- API: ACTIONS (POST) ---
if ($method === 'POST' && stripos($content_type, 'application/json') !== false) {
    header('Content-Type: application/json');
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['action'])) {
        echo json_encode(['success' => false, 'message' => 'No action specified']);
        exit;
    }

    $id = isset($input['id']) ? intval($input['id']) : 0;
    $action = $input['action'];

    if ($action === 'update_status') {
        $status = $conn->real_escape_string($input['status']);
        $sql = "UPDATE reservations SET status='$status' WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => $conn->error]);
        }
    } elseif ($action === 'delete') {
        $sql = "DELETE FROM reservations WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
    }

    $conn->close();
    exit;
}

if ($method === 'POST') {
    header('Content-Type: application/json');

    $email = sanitize_input($_POST['email'] ?? '');
    $name = sanitize_input($_POST['name'] ?? '');
    $model = sanitize_input($_POST['model'] ?? '');
    $machine = sanitize_input($_POST['machine'] ?? '');
    $compliment = sanitize_input($_POST['compliment'] ?? '');
    $phone = sanitize_input($_POST['phone'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');

    $errors = [];
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL))
        $errors[] = 'Valid email is required';
}

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Full name is required (at least 2 characters)';
}

if (empty($model)) {
    $errors[] = 'Model is required';
}

if (empty($machine)) {
    $errors[] = 'Machine name is required';
}

if (empty($phone) || !validate_phone($phone)) {
    $errors[] = 'Valid phone number is required';
}

if (empty($message) || strlen($message) < 5) {
    $errors[] = 'Message is required (at least 5 characters)';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => implode(', ', $errors)]);
    $conn->close();
    exit;
}

$date_db = null;

ini_set('display_errors', 0);


$timestamp = date('Y-m-d H:i:s');
$date_db = date('Y-m-d'); // Current date for date_field
$stmt = $conn->prepare("INSERT INTO reservations (timestamp, email, name, model, machine, compliment, phone, message, date_field, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]);
    $conn->close();
    exit;
}

$stmt->bind_param('sssssssss', $timestamp, $email, $name, $model, $machine, $compliment, $phone, $message, $date_db);

if ($stmt->execute()) {
    $insert_id = $stmt->insert_id;

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Your reservation has been submitted successfully!',
        'id' => $insert_id
    ]);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Insert failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
exit;


// Helper functions
function sanitize_input($data)
{
    return htmlspecialchars(stripslashes(trim($data)));
}

function validate_phone($phone)
{
    $phone = preg_replace('/[^0-9+\-]/', '', $phone);

    // Check if it has at least 7 digits
    if (preg_match('/\d{7,}/', $phone)) {
        return true;
    }
    return false;
}

/*function send_confirmation_email($email, $name, $data)
{
    $subject = "Reservation Confirmation - Zahra Medical";

    $message = "Hello " . $name . ",\n\n";
    $message .= "Thank you for your reservation!\n\n";
    $message .= "Reservation Details:\n";
    $message .= "- Model: " . $data['model'] . "\n";
    $message .= "- Machine: " . $data['machine'] . "\n";
    $message .= "- Phone: " . $data['phone'] . "\n\n";
    $message .= "We will contact you soon to confirm your reservation.\n\n";
    $message .= "Best regards,\nZahra Medical Team";

    $headers = "From: noreply@zahramedical.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, $subject, $message, $headers);
}*/
?>