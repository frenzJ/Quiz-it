<?php
require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$set_id = $data['set_id'];
$term = $data['term'];
$definition = $data['definition'];


if (!empty($term) && !empty($definition) && !empty($set_id)) {

    $sql = "INSERT INTO cards (set_id, term, definition) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->bind_param("iss", $set_id, $term, $definition);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Card created successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database insert failed: " . $stmt->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
}

$conn->close();
