define([    "jquery", "underscore", "backbone", "views/track/list-item", "text!templates/list.html"
], function( $,        _,            Backbone,   ListItem,               listTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "list",
        tagName: "div",

        /* view properties */
        headers: ["id", "title", "artist", "genre", "actions"],
        template: _.template(listTemplate),

        /* element methods */
        close: function() { $(this.el).unbind().remove(); },
        render: function() {
            var $el = $(this.el),
                $tbody = null;

            $el.html(this.template({
                add: "<p><a href='#tracks/add' class='btn'>Add track</a></p>",
                caption: "My tracks",
                headers: this.headers,
                more: this.options.more ? "<p class='more'><a href='#tracks'>More tracks</a></p>" : ""
            }));

            $tbody = $el.find("tbody");

            this.collection.each(function(model) {
                $tbody.append(new ListItem({ model: model }).render().el);
            });

            this.options.container.append(this.el);

            return this;
        },

        /* view methods */
        initialize: function() {
            this.collection.bind("reset", this.render, this);
            this.collection.bind("add", function(model) {
                $(this.el).find("tbody").prepend(new ListItem({ model: model }).render().el);
            }, this);
        }

    });

});