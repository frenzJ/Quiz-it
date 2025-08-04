<?php
/**
 * Updates a card's term and definition based on the given card ID.
 * 
 * Expects a JSON payload via POST with the following fields:
 * - set_id (int): The ID of the set the card belongs to (not used in query but expected in payload)
 * - card_id (int): The ID of the card to update
 * - term (string): The new term
 * - definition (string): The new definition
 * 
 * On success, returns a JSON response:
 * {
 *   "message": "Card updated"
 * }
 * 
 * On failure, returns a JSON response:
 * {
 *   "message": "Card error update"
 * }
 */

require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$set_id = $data['set_id'];
$card_id = $data['card_id'];
$term = $data['term'];
$definition = $data['definition'];

$sql = "UPDATE cards SET term = ?, definition = ? WHERE card_id = ?";

$stmt = mysqli_prepare($conn, $sql);
$stmt->bind_param("ssi", $term, $definition, $card_id);

if ($stmt->execute()) {
  echo json_encode(["message" => "Card updated"]);
} else {
  echo json_encode(["message" => "Card error update"]);
}

$stmt->close();
$conn->close();




