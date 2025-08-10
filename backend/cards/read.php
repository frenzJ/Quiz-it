<?php

/**
 * Retrieves all cards associated with a specific set ID from the database.
 * 
 * Expects a JSON payload via POST with the following field:
 * - set_id (int|string): The ID of the card set to retrieve cards for
 * 
 * On success, returns a JSON response:
 * {
 *   "status": "success",
 *   "message": "Cards read successfully.",
 *   "cards": [
 *     {
 *       "set_id": ...,
 *       "card_id": ...,
 *       "term": "...",
 *       "definition": "..."
 *     },
 *     ...
 *   ]
 * }
 * 
 * On failure, returns a JSON response:
 * {
 *   "status": "error",
 *   "message": "Database read failed: <error message>"
 * }
 */

require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$set_id = $data['set_id'];

$sql = "SELECT * FROM cards WHERE set_id = ?";
$stmt = mysqli_prepare($conn, $sql);
$stmt->bind_param("i", $set_id);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $cards = [];

    while ($row = $result->fetch_assoc()) {
        $card = new stdClass();
        $card->set_id = $row['set_id'];
        $card->card_id = $row['card_id'];
        $card->term = $row['term'];
        $card->definition = $row['definition'];
        $card->memorize = $row['memorize'];
        $cards[] = $card;
    }

    echo json_encode([
        "status" => "success",
        "message" => "Cards read successfully.",
        "cards" => $cards
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database read failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
