<?php
// Database configuration
$host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "inventory";

// Connect to database
$conn = new mysqli($host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Retrieve user
    $query = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["message" => "User not found"]);
    } else {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo json_encode(["message" => "Login successful", "user" => $user]);
        } else {
            echo json_encode(["message" => "Invalid credentials"]);
        }
    }
    $stmt->close();
}
$conn->close();
?>
