<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/books', 'getBooks');
$app->get('/books/:id',	'getBook');
$app->get('/books/search/:query', 'findByName');
$app->post('/books', 'addBook');
$app->put('/books/:id', 'updateBook');
$app->delete('/books/:id',	'deleteBook');

$app->response()->header('Content-Type', 'text/plain');

$app->run();

function getBooks() {
	//$sql = "SELECT id, title, author, price FROM books ORDER BY id";
	$sql = "SELECT * FROM books ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$books = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"book": ' . json_encode($books) . '}';
		echo json_encode($books);
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

function addBook() {
	//error_log('addBook\n', 3, '/var/tmp/php.log');
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
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
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

function findByName($query) {
	$sql = "SELECT * FROM books WHERE title LIKE :query ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$books = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"book": ' . json_encode($books) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="alantin76";
	$dbname="playground";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>