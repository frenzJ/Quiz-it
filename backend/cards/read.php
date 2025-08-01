<?php
  require '../db.php';

  $data = json_decode(file_get_contents("php://input"), true);
  $set_id = $data['set_id'];

  $sql = "SELECT * FROM cards
          WHERE set_id = ?";
  $stmt = mysqli_prepare($conn, $sql);
  $stmt->bind_param("s", $set_id);
  $stmt->execute();
  $result = $stmt->get_result();

  $cards = []; 

  while ($row = $result->fetch_assoc()) {
    $card = new stdClass();
    $card->set_id = $row['set_id'];
    $card->card_id = $row['card_id'];
    $card->term = $row['term'];
    $card->definition = $row['definition'];

    $cards[] = $card; 
  }

  echo json_encode(["cards" => $cards]);




  
