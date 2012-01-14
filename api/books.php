<?php

/* crud functions */
function addBook() {
	$request = Slim::getInstance()->request();
	$book = json_decode($request->getBody());
	$sql = "INSERT INTO books (title, description, pages, publisher, date, isbn, format, price, author, url) VALUES (:title, :description, :pages, :publisher, :date, :isbn, :format, :price, :author, :url)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("title", $book->title);
		$stmt->bindParam("description", $book->description);
		$stmt->bindParam("pages", $book->pages);
		$stmt->bindParam("publisher", $book->publisher);
		$stmt->bindParam("date", $book->date);
		$stmt->bindParam("isbn", $book->isbn);
		$stmt->bindParam("format", $book->format);
		$stmt->bindParam("price", $book->price);
		$stmt->bindParam("author", $book->author);
		$stmt->bindParam("url", $book->url);
		$stmt->execute();
		$book->id = $db->lastInsertId();
		$db = null;
		echo json_encode($book);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteBook($id) {
	$sql = "DELETE FROM books WHERE id=:id";
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

function getBook($id) {
	$sql = "SELECT * FROM books WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$book = $stmt->fetchObject();
		$db = null;
		echo json_encode($book);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getBooks() {
	$sql = "SELECT * FROM books ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$books = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($books);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateBook($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$book = json_decode($body);
	$sql = "UPDATE books SET title=:title, description=:description, pages=:pages, publisher=:publisher, date=:date, isbn=:isbn, format=:format, price=:price, author=:author, url=:url WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("title", $book->title);
		$stmt->bindParam("description", $book->description);
		$stmt->bindParam("pages", $book->pages);
		$stmt->bindParam("publisher", $book->publisher);
		$stmt->bindParam("date", $book->date);
		$stmt->bindParam("isbn", $book->isbn);
		$stmt->bindParam("author", $book->author);
		$stmt->bindParam("format", $book->format);
		$stmt->bindParam("price", $book->price);
		$stmt->bindParam("author", $book->author);
		$stmt->bindParam("url", $book->url);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($book);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}
/* /basic crud functions */

/* data functions */
function getFormats() {
	$sql = "SELECT DISTINCT format FROM books ORDER BY format";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$formats = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($formats);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getPublishers() {
	$sql = "SELECT DISTINCT publisher FROM books ORDER BY publisher";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$publishers = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($publishers);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}
/* /data functions */

?>