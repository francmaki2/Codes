<?php
session_start();
include "config.php";
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}
$user_id = $_SESSION["user_id"];

// Add habit
if (isset($_POST["habit"], $_POST["time_spent"])) {
    $habit = $_POST["habit"];
    $time_spent = (int) $_POST["time_spent"];

    // Use custom category if provided, otherwise use selected one
    $category = trim($_POST["category_custom"]) !== "" 
        ? $_POST["category_custom"] 
        : $_POST["category_select"];

    // If both are empty, set to "Uncategorized"
    if (empty($category)) {
        $category = "Uncategorized";
    }

    $stmt = $conn->prepare("INSERT INTO habits (user_id, title, category, time_spent) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("issi", $user_id, $habit, $category, $time_spent);
    $stmt->execute();
}


// Daily check-in
if (isset($_POST["checkin_id"])) {
    $habit_id = $_POST["checkin_id"];
    $stmt = $conn->prepare("INSERT INTO checkins (habit_id, checkin_date) VALUES (?, CURDATE())");
    $stmt->bind_param("i", $habit_id);
    $stmt->execute();
}

// Update status
if (isset($_POST["update_id"], $_POST["status"])) {
    $stmt = $conn->prepare("UPDATE habits SET status=? WHERE id=? AND user_id=?");
    $stmt->bind_param("sii", $_POST["status"], $_POST["update_id"], $user_id);
    $stmt->execute();
}

$habits = $conn->query("SELECT * FROM habits WHERE user_id=$user_id");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Habit Tracker Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body style="background-color: #e6f0ff;">
<div class="container">
    <h2>📘 Habit Tracker Dashboard</h2>

    <!-- Add Habit Form -->
    <form method="POST" class="habit-form">
        <input name="habit" type="text" placeholder="e.g. Study Math" required>

        <!-- Dropdown for predefined categories -->
        <label>Choose Category:</label>
        <select name="category_select">
            <option value="">-- Select Category --</option>
            <option value="Academic">Academic</option>
            <option value="Physical Activity">Physical Activity</option>
            <option value="Leisure">Leisure</option>
        </select>

        <!-- Or custom category -->
        <label>Or enter custom category:</label>
        <input name="category_custom" type="text" placeholder="e.g. Meditation, Language Learning">

        <input name="time_spent" type="number" placeholder="Time spent (minutes)" min="1" required>

        <button type="submit">Add Habit</button>
    </form>


    <!-- Habit Table -->
    <table>
        <thead>
            <tr>
                <th>Habit</th>
                <th>Category</th>
                <th>Time Spent (mins)</th>
                <th>Status</th>
                <th>Log Streak</th>
                <th>Update Status</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $habits->fetch_assoc()): ?>
            <tr>
                <td><?= htmlspecialchars($row["title"]) ?></td>
                <td><?= $row["category"] ?></td>
                <td><?= $row["time_spent"] ?></td>
                <td><?= $row["status"] ?></td>
                <td>
                    <form method="POST" class="inline-form">
                        <input type="hidden" name="checkin_id" value="<?= $row["id"] ?>">
                        <button type="submit">Log streak for today</button>
                    </form>
                </td>
                <td>
                    <form method="POST" class="inline-form">
                        <input type="hidden" name="update_id" value="<?= $row["id"] ?>">
                        <select name="status">
                            <option value="To Do" <?= $row["status"] == "To Do" ? "selected" : "" ?>>To Do</option>
                            <option value="Done" <?= $row["status"] == "Done" ? "selected" : "" ?>>Done</option>
                            <option value="Pending" <?= $row["status"] == "Pending" ? "selected" : "" ?>>Pending</option>
                        </select>
                        <button type="submit">Update</button>
                    </form>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>

    <!-- Navigation Buttons -->
    <a href="streaks.php" class="button-link">📊 View Weekly Progress</a>
    <a href="logout.php" class="button-link danger">🚪 Logout</a>
</div>
</body>
</html>
