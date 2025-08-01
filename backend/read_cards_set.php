<?php
require './db.php';
$results = [];

$sql = "SELECT sets.set_id, sets.set_name, sets.description, sets.set_date, cards.card_id, cards.term, cards.definition
            FROM sets
            LEFT JOIN cards ON sets.set_id = cards.set_id
            ORDER BY sets.set_id ASC";

$cards = $conn->query($sql);

if ($cards->num_rows > 0) {
    while ($cardRow = $cards->fetch_assoc()) {
        $set_id = $cardRow['set_id'];
        if (!isset($results[$set_id])) {
            $results[$set_id] = [
                "set_id" => $cardRow['set_id'],
                "set_name" => $cardRow['set_name'],
                "description" => $cardRow['description'],
                "set_date" => $cardRow['set_date'],
                "cards" => []
            ];
        }

        if($cardRow['term'] !== null) {
            $results[$set_id]['cards'][] = [
            "card_id" => $cardRow['card_id'],
            "term" => $cardRow['term'],
            "definition" => $cardRow['definition']
            ];
        }
    }

    $totalCardsPerSet = [];

    foreach ($results as $set) {
        $totalCardsPerSet[] = count($set['cards']);
    }

    echo json_encode([
        'set' => $results,
        'totalCardsPerSet' => $totalCardsPerSet
    ]);
}
