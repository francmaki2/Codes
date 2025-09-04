<?php
$servername = "localhost";
$username = "root";
$password = ""; // change if needed
$dbname = "habit_tracker";

// Connect to MySQL
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

// Create database if not exists
if ($conn->query("CREATE DATABASE IF NOT EXISTS $dbname") === TRUE) {
    echo "✅ Database <strong>$dbname</strong> created or already exists.<br>";
} else {
    die("❌ Error creating database: " . $conn->error);
}

// Use the database
$conn->select_db($dbname);

// Drop existing tables to start fresh
$conn->query("DROP TABLE IF EXISTS checkins");
$conn->query("DROP TABLE IF EXISTS habits");
$conn->query("DROP TABLE IF EXISTS users");

// Create users table
$sql_users = "CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)";
if ($conn->query($sql_users) === TRUE) {
    echo "✅ Table <strong>users</strong> created.<br>";
} else {
    echo "❌ Error creating users table: " . $conn->error . "<br>";
}

// Create habits table with VARCHAR category (supports custom input)
$sql_habits = "CREATE TABLE habits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(100) DEFAULT 'Uncategorized',
    time_spent INT DEFAULT 0,
    status ENUM('To Do', 'Done', 'Pending') DEFAULT 'To Do',
    created_at DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)";
if ($conn->query($sql_habits) === TRUE) {
    echo "✅ Table <strong>habits</strong> created with flexible category column.<br>";
} else {
    echo "❌ Error creating habits table: " . $conn->error . "<br>";
}

// Create checkins table
$sql_checkins = "CREATE TABLE checkins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habit_id INT NOT NULL,
    checkin_date DATE NOT NULL,
    FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
)";
if ($conn->query($sql_checkins) === TRUE) {
    echo "✅ Table <strong>checkins</strong> created.<br>";
} else {
    echo "❌ Error creating checkins table: " . $conn->error . "<br>";
}

$conn->close();
?>
