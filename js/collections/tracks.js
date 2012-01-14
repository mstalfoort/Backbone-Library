define([    "underscore", "backbone", "models/track"
], function( _,            Backbone,   Track) {

    return Backbone.Collection.extend({
        comparator: function(track) {
            return track.get("title");
        },
        model: Track,
        url: "api/tracks"
    });

});