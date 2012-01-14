define([    "underscore", "backbone"
], function( _,            Backbone) {

    return Backbone.Model.extend({
        fields: [
            { label: "title", type: "text" },
            { label: "artist", type: "text" },
            { label: "album", type: "text" },
            { label: "length", type: "text" },
            { label: "genre", type: "text" },
            { label: "year", type: "text" }
        ],
        urlRoot: "api/tracks"
    });
});
