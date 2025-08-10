<?php

/**
 * Retrieves a specific card set's details from the database using its set ID.
 * 
 * Expects a JSON payload via POST with the following field:
 * - set_id (int|string): The ID of the set to retrieve
 * 
 * On success, returns a JSON response:
 * {
 *   "status": "success",
 *   "message": "Set read successfully.",
 *   "set_id": <set_id>,
 *   "set_name": "<set name>",
 *   "description": "<description>"
 * }
 * 
 * On failure, returns a JSON response:
 * {
 *   "status": "error",
 *   "message": "Database read set failed: <error message>"
 * }
 */

require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$set_id = $data['set_id'];

$sql = "SELECT * FROM sets WHERE set_id = ?";
$stmt = mysqli_prepare($conn, $sql);
$stmt->bind_param("s", $set_id);

if ($stmt->execute()) {
    $result = $stmt->get_result();

    while ($resultRow = $result->fetch_assoc()) {
        $set_id = $resultRow['set_id'];
        $set_name = $resultRow['set_name'];
        $description = $resultRow['description'];
    }

    echo json_encode([
        "status" => "success",
        "message" => "Set read successfully.",
        "set_id" => $set_id,
        "set_name" => $set_name,
        "description" => $description
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database read set failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
