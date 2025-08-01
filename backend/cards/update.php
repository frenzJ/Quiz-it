<?php 
  require '../db.php';

  $data = json_decode(file_get_contents("php://input"), true);
  $set_id = $data['set_id'];
  $card_id = $data['card_id'];
  $term = $data['term'];
  $definition = $data['definition'];

  $sql = "UPDATE cards SET term = ?, definition = ? 
          WHERE card_id = ?";

  $stmt =  mysqli_prepare($conn, $sql);
  $stmt->bind_param("ssi", $term, $definition, $card_id);

  if($stmt->execute()) {
    echo json_encode(["message" => "Card updated"]);
  } else {
    echo json_encode(["message" => "Card error update"]);
  }







