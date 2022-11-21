<?php
$json_data = file_get_contents('php://input');
file_put_contents('joueurs.json', $json_data);
