<?php

/**
 * Handles the creation of a new card in the database.
 * 
 * Expects a JSON payload via POST with the following fields:
 * - set_id (int): The ID of the card set
 * - term (string): The term of the flashcard
 * - definition (string): The definition of the flashcard
 * 
 * On success, returns a JSON response:
 * {
 *   "status": "success",
 *   "message": "Card created successfully."
 * }
 * 
 * On failure, returns a JSON response with status "error" and an appropriate message.
 */

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
        exit;
    } else {
        echo json_encode(["status" => "error", "message" => "Database insert failed: " . $stmt->error]);
        exit;
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit;
}

$stmt->close();
$conn->close();
