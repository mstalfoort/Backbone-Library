<?php

/* crud functions */
function addTrack() {
	$request = Slim::getInstance()->request();
	$track = json_decode($request->getBody());
	$sql = "INSERT INTO tracks (title, artist, album, length, genre, year) VALUES (:title, :artist, :album, :length, :genre, :year)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("title", $track->title);
		$stmt->bindParam("artist", $track->artist);
		$stmt->bindParam("album", $track->album);
		$stmt->bindParam("length", $track->length);
		$stmt->bindParam("genre", $track->genre);
		$stmt->bindParam("year", $track->year);
		$stmt->execute();
		$track->id = $db->lastInsertId();
		$db = null;
		echo json_encode($track);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteTrack($id) {
	$sql = "DELETE FROM tracks WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getTrack($id) {
	$sql = "SELECT * FROM tracks WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$track = $stmt->fetchObject();
		$db = null;
		echo json_encode($track);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getTracks() {
	$sql = "SELECT * FROM tracks ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$tracks = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($tracks);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateTrack($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$track = json_decode($body);
	$sql = "UPDATE tracks SET title=:title, artist=:artist, album=:album, length=:length, genre=:genre, year=:year WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("title", $track->title);
		$stmt->bindParam("artist", $track->artist);
		$stmt->bindParam("album", $track->album);
		$stmt->bindParam("length", $track->length);
		$stmt->bindParam("genre", $track->genre);
		$stmt->bindParam("year", $track->year);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($track);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}
/* /basic crud functions */

?>