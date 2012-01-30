define([    "jquery",  "underscore", "backbone", "models/book", "collections/books", "views/book/add", "views/book/delete", "views/book/details", "views/book/edit", "views/book/list"
], function( $,         _,            Backbone,   BookModel,     BookCollection,      BookAddView,      BookDeleteView,      BookDetailsView,      BookEditView,      BookListView) {

    return Backbone.Router.extend({

        addBook: function(library, config) {
            library.views[config.view] = new BookAddView({
                collection: library.collections.books || new BookCollection(),
                container: library.appContainer,
                model: new BookModel()
            }).render();
        },

        deleteBook: function(library, config) {
            var setDeleteView = function(model) {
                library.views[config.view] = new BookDeleteView({
                    container: library.appContainer,
                    model: model
                }).render();
            };

            library.collections.books
                ? setDeleteView(library.collections.books.get(config.id))
                : new BookModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setDeleteView(model);
                    }
                });
        },

        editBook: function(library, config) {
            var setEditView = function(model) {
                library.views[config.view] = new BookEditView({
                    container: library.appContainer,
                    model: model
                }).render();
            };

            library.collections.books
                ? setEditView(library.collections.books.get(config.id))
                : new BookModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setEditView(model);
                    }
                });

        },

        showBook: function(library, config) {
            var setBookView = function(model) {
                library.views[config.view] = new BookDetailsView({
                    container: library.appContainer,
                    model: model
                }).render();
            };

            library.collections.books
                ? setBookView(library.collections.books.get(config.id))
                : new BookModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setBookView(model);
                    }
                });
        },

        showBooks: function(library, config) {
            library.collections.books = library.collections.books || new BookCollection();  /* make sure we have a collection */

            library.views[config.view] = library.views[config.view] || new BookListView({   /* reuse existing view to prevent double reset */
                backlink: true,
                collection: library.collections.books,
                container: library.appContainer
            });

            if (library.collections.books.length !== 0) {                                   /* collection has been fetched previously */
                if (library.collections.books.length === config.amount) {
                    library.views[config.view].render();
                } else {                                                                    /* amount to be rendered has changed so fetch it */
                    library.collections.books.fetch({
                        data: {
                            amount: config.amount
                        }
                    });
                }
            } else {                                                                        /* collection is empty so fetch it */
                library.collections.books.fetch({
                    data: {
                        amount: config.amount
                    }
                });
            }
        }

    });

});