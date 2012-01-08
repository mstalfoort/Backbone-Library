require.config({
	baseUrl: "js",
	paths: {
		jquery: "libs/jquery/jquery",
		underscore: "libs/backbone/underscore",
		backbone: "libs/backbone/backbone",
		text: "libs/require/text"
	}
});

require(["routers/library", "backbone"], function(Library, Backbone) {
	var myLibrary = new Library({
		appContainer: "#my-library"
	});
	Backbone.history.start();
});

/*
	* convert booklist to table
	* implement templates
	* add book details
	* implement book crud
	* refactor showBookList
	* implement dispatcher
	* setup database-backed api
	* implement model/collection fetches
	* prevent unnecessary server calls
	* completely decouple models, collections, views and routers
	* integrate with require.js
	* move templates to separate files
	add model validation
	add field types
	add paging
	add flash messages
	add hasRead toggle to booklist
	add movies
	add music
*/
