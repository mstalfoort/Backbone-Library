<?php

include_once('books.php');
include_once('tracks.php');

require 'Slim/Slim.php';

$app = new Slim();

/* books */
$app->post('/books', 'addBook');
$app->delete('/books/:id',	'deleteBook');
$app->get('/books/:id',	'getBook');
$app->get('/books', 'getBooks');
$app->put('/books/:id', 'updateBook');

$app->get('/publishers', 'getPublishers');
$app->get('/formats', 'getFormats');
/* /books */

/* tracks */
$app->post('/tracks', 'addTrack');
$app->delete('/tracks/:id',	'deleteTrack');
$app->get('/tracks/:id',	'getTrack');
$app->get('/tracks', 'getTracks');
$app->put('/tracks/:id', 'updateTrack');
/* /tracks */

//$app->response()->header('Content-Type', 'text/plain');

$app->run();

function getConnection() {
    include_once('config.inc.php');

    $dbhost = $config['dbhost'];
    $dbuser = $config['dbuser'];
    $dbpass = $config['dbpass'];
    $dbname = $config['dbname'];

	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>