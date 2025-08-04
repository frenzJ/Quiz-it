<?php
/**
 * Updates the name and description of a specific card set in the database.
 * 
 * Expects a JSON payload via POST with the following fields:
 * - set_id (int): The ID of the set to update
 * - set_name (string): The new name of the set
 * - description (string): The new description of the set
 * 
 * On success, returns a JSON response:
 * {
 *   "message": "Set updated"
 * }
 * 
 * On failure, returns a JSON response:
 * {
 *   "message": "Set error update"
 * }
 */

require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$set_id = $data['set_id'];
$set_name = $data['set_name'];
$description = $data['description'];

$sql = "UPDATE sets SET set_name = ?, description = ? WHERE set_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $set_name, $description, $set_id);

if ($stmt->execute()) {
  echo json_encode(["message" => "Set updated"]);
} else {
  echo json_encode(["message" => "Set error update"]);
}

$stmt->close();
$conn->close();


