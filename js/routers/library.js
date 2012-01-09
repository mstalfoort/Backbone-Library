define([    "jquery",  "underscore", "backbone", "models/book", "collections/books", "views/book/add", "views/book/delete", "views/book/details", "views/book/edit", "views/book/list"
], function( $,         _,            Backbone,   BookModel,     BookCollection,      BookAddView,      BookDeleteView,      BookDetailsView,      BookEditView,      BookListView) {

    return Backbone.Router.extend({
        initialize: function(options) {
            this.appContainer = $(options.appContainer);
        },

        appContainer: null,
        collections: {},
        currentView: null,
        routes: {
            ""                  : "showBookList",
            "books/add"         : "addBook",
            "books/:id/delete"  : "deleteBook",
            "books/:id/edit"    : "editBook",
            "books/:id/show"    : "showBook"
        },
        views: {},

        addBook: function() {
            this.dispatch("addBook", null, function(router, view) {
                router.views[view] = new BookAddView({
                    collection: router.collections.books || new BookCollection(),
                    container: router.appContainer,
                    model: new BookModel()
                }).render();
            });
        },
        deleteBook: function(id) {
            this.dispatch("deleteBook", id, function(router, view) {
                var setDeleteView = function(model) {
                    router.views[view] = new BookDeleteView({
                        container: router.appContainer,
                        model: model
                    }).render();
                };

                router.collections.books
                    ? setDeleteView(router.collections.books.get(id))
                    : new BookModel({ id: id }).fetch({
                        success: function(model, response) {
                            setDeleteView(model);
                        }
                    });
            })
        },
        editBook: function(id) {
            this.dispatch("editBook", id, function(router, view) {
                var setEditView = function(model) {
                    router.views[view] = new BookEditView({
                        container: router.appContainer,
                        model: model
                    }).render();
                };

                router.collections.books
                    ? setEditView(router.collections.books.get(id))
                    : new BookModel({ id: id }).fetch({
                        success: function(model, response) {
                            setEditView(model);
                        }
                    });
            });
        },
        showBook: function(id) {
            this.dispatch("showBook", id, function(router, view) {
                var setBookView = function(model) {
                    router.views[view] = new BookDetailsView({
                        container: router.appContainer,
                        model: model
                    }).render();
                };

                router.collections.books
                    ? setBookView(router.collections.books.get(id))
                    : new BookModel({ id: id }).fetch({
                        success: function(model, response) {
                            setBookView(model);
                        }
                    });
            });
        },
        showBookList: function() {
            this.collections.books = this.collections.books || new BookCollection(); /* make sure we have a collection */
            this.dispatch("showBookList", null, function(router, view) {
                router.views[view] = new BookListView({
                    container: router.appContainer,
                    collection: router.collections.books
                });

                router.collections.books.length !== 0
                    ? router.views[view].render()       /* collection has been fetched previously */
                    : router.collections.books.fetch(); /* collection is empty so fetch it */
            });
        },

        dispatch: function(view, modelId, callback) {
            var router = this;

            if (router.currentView === view) {  /* view corresponds with current view */
                callback(router, view);         /* so execute view's callback */
            } else {
                router.views[router.currentView] && router.views[router.currentView].close();   /* close current view */
                router.currentView = view;                                                      /* update currentView with new view */
                router[view](modelId);                                                          /* execute new view */
            }
        }
    });

});