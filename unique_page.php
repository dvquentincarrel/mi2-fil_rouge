<?php
$joueurs_json = file_get_contents('joueurs.json');
echo("<script>joueurs_data = $joueurs_json</script>");
?>
<html lang="fr">
<head>
	<link rel="stylesheet" type="text/css" href="style.css"/>
	<title>le premier tp</title>
	<meta charset="UTF-8"/>
	<meta name="keywords" content="sport, club"/>
	<meta name="description" content="Page d'ambiance"/>
	<script src="pages.json"></script>
	<script src="processor.js"></script>
	<script src="data.json"></script>
</head>
<body>
	<h1>Ambiance</h1>
	<hr>
	<h2 id="menu">Menu</h2>
	<nav></nav>
	<hr>
	<div id="anchor">
		<script>inject_page(pages_json,"page","accueil")</script>
	</div>
</body>
