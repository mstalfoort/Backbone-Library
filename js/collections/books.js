define([    "underscore", "backbone", "models/book"
], function( _,            Backbone,   Book) {

    return Backbone.Collection.extend({
        comparator: function(book) {
            return book.get("title");
        },
        model: Book,
        url: "api/books"
    });

});