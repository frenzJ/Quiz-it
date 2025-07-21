<?php
require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$set_name = $data['set_name'];
$description = $data['description'];

if (!empty($set_name) && !empty($description)) {

    $sql = "INSERT INTO sets (set_name, description) VALUES (?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->bind_param("ss", $set_name, $description);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Set created successfully.",
            "set_id" => $conn->insert_id
        ]);
    }
}

$conn->close();
