define([    "jquery",  "underscore", "backbone", "models/track", "collections/tracks", "views/track/add", "views/track/delete", "views/track/details", "views/track/edit", "views/track/list"
], function( $,         _,            Backbone,   TrackModel,     TrackCollection,      TrackAddView,      TrackDeleteView,      TrackDetailsView,      TrackEditView,      TrackListView) {

    return Backbone.Router.extend({

        addTrack: function(router, config) {
            router.views[config.view] = new TrackAddView({
                collection: router.collections.tracks || new TrackCollection(),
                container: router.appContainer,
                model: new TrackModel()
            }).render();
        },

        deleteTrack: function(router, config) {
            var setDeleteView = function(model) {
                router.views[config.view] = new TrackDeleteView({
                    container: router.appContainer,
                    model: model
                }).render();
            };

            router.collections.tracks
                ? setDeleteView(router.collections.tracks.get(config.id))
                : new TrackModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setDeleteView(model);
                    }
                });
        },

        editTrack: function(router, config) {
            var setEditView = function(model) {
                router.views[config.view] = new TrackEditView({
                    container: router.appContainer,
                    model: model
                }).render();
            };

            router.collections.tracks
                ? setEditView(router.collections.tracks.get(config.id))
                : new TrackModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setEditView(model);
                    }
                });

        },

        showTrack: function(router, config) {
            var setTrackView = function(model) {
                router.views[config.view] = new TrackDetailsView({
                    container: router.appContainer,
                    model: model
                }).render();
            };

            router.collections.tracks
                ? setTrackView(router.collections.tracks.get(config.id))
                : new TrackModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setTrackView(model);
                    }
                });
        },

        showTracks: function(router, config) {
            router.collections.tracks = router.collections.tracks || new TrackCollection(); /* make sure we have a collection */

            library.views[config.view] = library.views[config.view] || new TrackListView({   /* reuse existing view to prevent double reset */
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