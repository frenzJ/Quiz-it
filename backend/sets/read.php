<?php
  require '../db.php';

  $data = json_decode(file_get_contents("php://input"), true);
  $set_id = $data['set_id'];

  $sql = "SELECT * FROM sets
          WHERE set_id = ?";
  $stmt = mysqli_prepare($conn, $sql);
  $stmt->bind_param("s", $set_id);
  $stmt->execute();
  $result = $stmt->get_result();

  while ($resultRow = $result->fetch_assoc()){
    $set_id = $resultRow['set_id'];
    $set_name = $resultRow['set_name'];
    $description = $resultRow['description'];
  };

  echo json_encode(["set_id" => $set_id, "set_name" => $set_name, "description" => $description]);