<?php
// Allow cross-origin requests from your frontend
header("Access-Control-Allow-Origin: http://localhost:3000"); // Update to match your frontend URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Exit for preflight requests
}

// Database configuration
$host = "localhost";
$db_user = "appuser";
$db_pass = "";
$db_name = "inventory";

// Connect to the database
$conn = new mysqli($host, $db_user, $db_pass, $db_name);

// Check the connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed: " . $conn->connect_error]));
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Validate inputs
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;
    $gender = $_POST['gender'] ?? null;
    $mobileNumber = $_POST['mobileNumber'] ?? null;
   // $dob = $_POST['dob'] ?? null; // Uncomment this if DOB is provided in the frontend

    if (!$name || !$email || !$password || !$gender || !$mobileNumber) {
        echo json_encode(["message" => "Missing required fields"]);
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check if email already exists
    $checkEmailQuery = "SELECT email FROM users WHERE email = ?";
    $stmt = $conn->prepare($checkEmailQuery);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["message" => "Email already exists"]);
    } else {
        // Insert user into database
        $query = "INSERT INTO users (name, email, password, gender, mobile_number) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssss", $name, $email, $hashedPassword, $gender, $mobileNumber);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Account created successfully"]);
        } else {
            echo json_encode(["message" => "Error: " . $conn->error]);
        }
    }
    $stmt->close();
}
$conn->close();
?>
