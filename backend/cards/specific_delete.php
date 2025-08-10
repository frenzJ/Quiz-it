<?php

/**
 * Deletes all cards associated with a specific card ID from the database.
 * 
 * Expects a JSON payload via POST with the following field:
 * - card_id: integer, the ID of the card card to delete
 * 
 * On success, returns a JSON response with a success message.
 * On failure, returns a JSON response with an error message.
 * 
 * Example JSON payload:
 * {
 *   "card_id": 3
 * }
 */

require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$cardIdToDelete = $data['card_id'];

$sql = "DELETE FROM cards WHERE card_id = ?";
$stmt = mysqli_prepare($conn, $sql);
$stmt->bind_param("i", $cardIdToDelete);

if ($stmt->execute()) {
    echo json_encode(["message" => "Cards deleted successfully", "card_id" => $cardIdToDelete]);
    exit;
} else {
    echo json_encode(["message" => "Cards deleted unsuccessfully"]);
    exit;
}

$stmt->close();
$conn->close();
