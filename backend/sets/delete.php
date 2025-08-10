<?php

/**
 * Deletes a card set from the database based on the given set ID.
 * 
 * Expects a JSON payload via POST with the following field:
 * - set_id (int): The ID of the set to be deleted
 * 
 * On success, returns a JSON response:
 * {
 *   "message": "Set deleted successfully"
 * }
 * 
 * On failure, returns a JSON response:
 * {
 *   "message": "Set deleted unsuccessfully"
 * }
 */

require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$setIdToDelete = $data['set_id'];

$sql = "DELETE FROM sets WHERE set_id = ?";
$stmt = mysqli_prepare($conn, $sql);
$stmt->bind_param("i", $setIdToDelete);

if ($stmt->execute()) {
    echo json_encode(["message" => "Set deleted successfully"]);
    exit;
} else {
    echo json_encode(["message" => "Set deleted unsuccessfully"]);
    exit;
}

$stmt->close();
$conn->close();
