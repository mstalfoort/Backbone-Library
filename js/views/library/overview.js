define([    "jquery", "underscore", "backbone", "views/book/list", "views/track/list", "text!templates/overview.html"
], function( $,        _,            Backbone,   BookListView,      TrackListView,      overviewTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "overview",
        tagName: "div",

        /* view properties */
        template: _.template(overviewTemplate),

        /* element methods */
        close: function() { $(this.el).unbind().remove(); },
        render: function() {
            var $el = $(this.el);

            _.each(this.options.collections, function(collection, index, collections) {
                switch(collection.type) {
                    case "books": new BookListView({
                        collection: collection.instance,
                        container: $el,
                        more: true
                    }).render();
                    break;
                    case "tracks": new TrackListView({
                        collection: collection.instance,
                        container: $el,
                        more: true
                    }).render();
                    break;
                    default:
                }
            }, this);

            this.options.container.append(this.el);

            return this;
        }

    });

});