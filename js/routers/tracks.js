define([    "jquery",  "underscore", "backbone", "models/track", "collections/tracks", "views/track/add", "views/track/delete", "views/track/details", "views/track/edit", "views/track/list"
], function( $,         _,            Backbone,   TrackModel,     TrackCollection,      TrackAddView,      TrackDeleteView,      TrackDetailsView,      TrackEditView,      TrackListView) {

    return Backbone.Router.extend({

        addTrack: function(library, config) {
            library.views[config.view] = new TrackAddView({
                collection: library.collections.tracks || new TrackCollection(),
                container: library.appContainer,
                model: new TrackModel()
            }).render();
        },

        deleteTrack: function(library, config) {
            var setDeleteView = function(model) {
                library.views[config.view] = new TrackDeleteView({
                    container: library.appContainer,
                    model: model
                }).render();
            };

            router.collections.tracks
                ? setDeleteView(library.collections.tracks.get(config.id))
                : new TrackModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setDeleteView(model);
                    }
                });
        },

        editTrack: function(library, config) {
            var setEditView = function(model) {
                library.views[config.view] = new TrackEditView({
                    container: library.appContainer,
                    model: model
                }).render();
            };

            library.collections.tracks
                ? setEditView(library.collections.tracks.get(config.id))
                : new TrackModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setEditView(model);
                    }
                });

        },

        showTrack: function(library, config) {
            var setTrackView = function(model) {
                library.views[config.view] = new TrackDetailsView({
                    container: library.appContainer,
                    model: model
                }).render();
            };

            library.collections.tracks
                ? setTrackView(library.collections.tracks.get(config.id))
                : new TrackModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setTrackView(model);
                    }
                });
        },

        showTracks: function(library, config) {
            library.collections.tracks = library.collections.tracks || new TrackCollection(); /* make sure we have a collection */

            library.views[config.view] = library.views[config.view] || new TrackListView({   /* reuse existing view to prevent double reset */
                backlink: true,
                container: library.appContainer,
                collection: library.collections.tracks
            });

            if (library.collections.tracks.length !== 0) {                                   /* collection has been fetched previously */
                if (library.collections.tracks.length === config.amount) {
                    library.views[config.view].render();
                } else {                                                                    /* amount to be rendered has changed so fetch it */
                    library.collections.tracks.fetch({
                        data: {
                            amount: config.amount
                        }
                    });
                }
            } else {                                                                        /* collection is empty so fetch it */
                library.collections.tracks.fetch({
                    data: {
                        amount: config.amount
                    }
                });
            }
        }

    });

});