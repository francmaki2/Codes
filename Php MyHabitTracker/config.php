<?php
$conn = new mysqli("localhost", "root", "", "habit_tracker");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
