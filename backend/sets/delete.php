<?php
require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$setIdToDelete = $data['set_id'];

$sql2 = "DELETE FROM cards
            WHERE set_id = ?";
$stmt2 = mysqli_prepare($conn, $sql2);
$stmt2->bind_param("i", $setIdToDelete);

$sql1 = "DELETE FROM sets
            WHERE set_id = ?";
$stmt1 = mysqli_prepare($conn, $sql1);
$stmt1->bind_param("i", $setIdToDelete);

if ($stmt2->execute() && $stmt1->execute()) {
    echo json_encode(["message" => "Deleted successfully"]);
    exit;
} else {
    echo json_encode(["message" => "Deleted unsuccessfully"]);
    exit;
}
