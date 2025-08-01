<?php
  require '../db.php';

  $data = json_decode(file_get_contents("php://input"), true);
  $set_id = $data['set_id'];
  $set_name = $data['set_name'];
  $description = $data['description'];

  $sql = "UPDATE sets SET set_name = ? , description = ? 
          WHERE set_id = ? ";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssi", $set_name, $description, $set_id);
  
  if($stmt->execute()){
    echo json_encode(["message" => "Set updated"]);
  }
  else{
    echo json_encode(["message" => "Set error update"]);
  }


