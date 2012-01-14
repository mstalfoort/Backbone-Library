define([    "jquery",  "underscore", "backbone", "models/book", "collections/books", "views/book/add", "views/book/delete", "views/book/details", "views/book/edit", "views/book/list"
], function( $,         _,            Backbone,   BookModel,     BookCollection,      BookAddView,      BookDeleteView,      BookDetailsView,      BookEditView,      BookListView) {

    return Backbone.Router.extend({

        addBook: function(router, config) {
            router.views[config.view] = new BookAddView({
                collection: router.collections.books || new BookCollection(),
                container: router.appContainer,
                model: new BookModel()
            }).render();
        },

        deleteBook: function(router, config) {
            var setDeleteView = function(model) {
                router.views[config.view] = new BookDeleteView({
                    container: router.appContainer,
                    model: model
                }).render();
            };

            router.collections.books
                ? setDeleteView(router.collections.books.get(config.id))
                : new BookModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setDeleteView(model);
                    }
                });
        },

        editBook: function(router, config) {
            var setEditView = function(model) {
                router.views[config.view] = new BookEditView({
                    container: router.appContainer,
                    model: model
                }).render();
            };

            router.collections.books
                ? setEditView(router.collections.books.get(config.id))
                : new BookModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setEditView(model);
                    }
                });

        },

        showBook: function(router, config) {
            var setBookView = function(model) {
                router.views[config.view] = new BookDetailsView({
                    container: router.appContainer,
                    model: model
                }).render();
            };

            router.collections.books
                ? setBookView(router.collections.books.get(config.id))
                : new BookModel({ id: config.id }).fetch({
                    success: function(model, response) {
                        setBookView(model);
                    }
                });
        },

        showBooks: function(router, config) {
            router.collections.books = router.collections.books || new BookCollection(); /* make sure we have a collection */

            router.views[config.view] = new BookListView({
                container: router.appContainer,
                collection: router.collections.books
            });

            router.collections.books.length !== 0
                ? router.views[config.view].render()    /* collection has been fetched previously */
                : router.collections.books.fetch();     /* collection is empty so fetch it */
        }

    });

});