define([    "underscore", "backbone"
], function( _,            Backbone) {

    return Backbone.Model.extend({
        fields: [
            { label: "title", type: "text" },
            { label: "description", type: "memo" },
            { label: "author", type: "text" },
            { label: "publisher", type: "list", src: "api/publishers" },
            { label: "date", type: "text" },
            { label: "isbn", type: "text" },
            { label: "format", type: "text" },
            { label: "pages", type: "text" },
            { label: "price", type: "text" },
            { label: "url", type: "text" }
        ],
        urlRoot: "api/books"
    });
});
