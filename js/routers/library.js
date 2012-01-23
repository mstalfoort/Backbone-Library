define([    "jquery",  "underscore", "backbone", "routers/books", "routers/tracks", "collections/books", "collections/tracks", "views/library/overview"
], function( $,         _,            Backbone,   BookRouter,      TrackRouter,      BookCollection,      TrackCollection,      LibraryOverview) {

    return Backbone.Router.extend({
        initialize: function(options) {
            this.appContainer = $(options.appContainer);

            var bookRouter = new BookRouter(),
                trackRouter = new TrackRouter;

            this.route("", "showOverview", function() {
                this.dispatch({
                    router: this,
                    view: "showOverview"
                });
            });


            this.route("books/add", "addBook", function() {
                this.dispatch({
                    router: bookRouter,
                    view: "addBook"
                });
            });

            this.route("books/:id/delete", "deleteBook", function(id) {
                this.dispatch({
                    id: id,
                    router: bookRouter,
                    view: "deleteBook"
                });
            });

            this.route("books/:id/edit", "editBook", function(id) {
                this.dispatch({
                    id: id,
                    router: bookRouter,
                    view: "editBook"
                });
            });

            this.route("books/:id/show", "showBook", function(id) {
                this.dispatch({
                    id: id,
                    router: bookRouter,
                    view: "showBook"
                });
            });

            this.route("books/top/:amount", "showBooks", function(amount) {
                this.dispatch({
                    amount: amount,
                    router: bookRouter,
                    view: "showBooks"
                });
            });

            this.route("books", "showBooks", function() {
                this.dispatch({
                    router: bookRouter,
                    view: "showBooks"
                });
            });



            this.route("tracks/add", "addTrack", function() {
                this.dispatch({
                    router: trackRouter,
                    view: "addTrack"
                });
            });

            this.route("tracks/:id/delete", "deleteTrack", function(id) {
                this.dispatch({
                    id: id,
                    router: trackRouter,
                    view: "deleteTrack"
                });
            });

            this.route("tracks/:id/edit", "editTrack", function(id) {
                this.dispatch({
                    id: id,
                    router: trackRouter,
                    view: "editTrack"
                });
            });

            this.route("tracks/:id/show", "showTrack", function(id) {
                this.dispatch({
                    id: id,
                    router: trackRouter,
                    view: "showTrack"
                });
            });

            this.route("tracks/top/:amount", "showTracks", function(amount) {
                this.dispatch({
                    amount: amount,
                    router: trackRouter,
                    view: "showTracks"
                });
            });

            this.route("tracks", "showTracks", function() {
                this.dispatch({
                    router: trackRouter,
                    view: "showTracks"
                });
            });

        },

        appContainer: null,
        currentView: null,

        collections: {},
        views: {},

        dispatch: function(config) {
            this.views[this.currentView] && this.views[this.currentView].close();
            this.currentView = config.view;
            config.router[config.view](this, config);
        },

        showOverview: function(library, config) {
            var books = new BookCollection(),
                tracks = new TrackCollection();

            library.views[config.view] = new LibraryOverview({
                collections: [{
                    instance: books,
                    type: "books"
                }, {
                    instance: tracks,
                    type: "tracks"
                }],
                container: library.appContainer
            });

            books.fetch({
                data: {
                    amount: 5
                }
            });

            tracks.fetch({
                data: {
                    amount: 5
                }
            });

            library.views[config.view].render();
        }

    });

});