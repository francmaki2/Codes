<?php
session_start();
include "config.php";
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION["user_id"];

// Fetch habits and check-ins
$sql = "SELECT h.id, h.title, c.checkin_date
        FROM habits h
        LEFT JOIN checkins c ON h.id = c.habit_id
        WHERE h.user_id = ?
        ORDER BY h.id, c.checkin_date DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Organize data by habit
$habitData = [];
while ($row = $result->fetch_assoc()) {
    $habitId = $row['id'];
    $habitTitle = $row['title'];
    $checkinDate = $row['checkin_date'];

    if (!isset($habitData[$habitId])) {
        $habitData[$habitId] = [
            'title' => $habitTitle,
            'checkins' => [],
        ];
    }

    if ($checkinDate) {
        $habitData[$habitId]['checkins'][] = $checkinDate;
    }
}

// Function to calculate consecutive streak
function calculateStreak($dates) {
    if (empty($dates)) return 0;
    $streak = 0;
    $yesterday = new DateTime(); // today
    $yesterday->setTime(0, 0); // strip time
    $yesterday->modify('-1 day');

    foreach ($dates as $date) {
        $checkin = DateTime::createFromFormat('Y-m-d', $date);
        if ($checkin->format('Y-m-d') == (new DateTime())->format('Y-m-d')) {
            // today's check-in → continue
            $streak++;
            $yesterday = new DateTime(); // reset comparison point
        } elseif ($checkin->format('Y-m-d') == $yesterday->format('Y-m-d')) {
            $streak++;
            $yesterday->modify('-1 day');
        } else {
            break; // streak broken
        }
    }
    return $streak;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Weekly Streaks</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h2>🔥 Your Habit Streaks</h2>

    <?php if (empty($habitData)): ?>
        <p>You haven't checked in on any habits yet.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>Habit</th>
                    <th>Current Streak (days)</th>
                    <th>Check-in Dates</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($habitData as $habit): ?>
                <tr>
                    <td><?= htmlspecialchars($habit['title']) ?></td>
                    <td><?= calculateStreak($habit['checkins']) ?></td>
                    <td>
                        <?php
                        foreach ($habit['checkins'] as $date) {
                            echo date("M d, Y", strtotime($date)) . "<br>";
                        }
                        ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>

    <a href="dashboard.php" class="button-link">⬅ Back to Dashboard</a>
</div>
</body>
</html>
