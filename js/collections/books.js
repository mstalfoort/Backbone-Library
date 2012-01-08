define(["underscore", "backbone", "models/book"], function(_, Backbone, Book) {

	return Backbone.Collection.extend({
		model: Book,
		url: "api/books"
	});

});