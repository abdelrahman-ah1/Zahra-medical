<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';

$sql = "SELECT * FROM events";
$result = $conn->query($sql);

echo "<h2>Events List</h2>";

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo $row['id'] . " - "
           . $row['name'] . " - "
           . $row['date'] . "<br>";
    }
} else {
    echo "No events found.";
}
?>
