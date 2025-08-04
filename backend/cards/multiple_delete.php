<?php 
/**
 * Deletes all cards associated with a specific set ID from the database.
 * 
 * Expects a JSON payload via POST with the following field:
 * - set_id (int): The ID of the card set whose cards should be deleted
 * 
 * On success, returns a JSON response:
 * {
 *   "message": "Cards deleted successfully"
 * }
 * 
 * On failure, returns a JSON response:
 * {
 *   "message": "Cards deleted unsuccessfully"
 * }
 */

require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$setIdToDelete = $data['set_id'];

$sql = "DELETE FROM cards WHERE set_id = ?";
$stmt = mysqli_prepare($conn, $sql);
$stmt->bind_param("i", $setIdToDelete);

if ($stmt->execute()) {
  echo json_encode(["message" => "Cards deleted successfully"]);
  exit;
} else {
  echo json_encode(["message" => "Cards deleted unsuccessfully"]);
  exit;
}

$stmt->close();
$conn->close();
