define(["jquery", "underscore", "backbone", "views/book/list-item", "text!templates/book/list.html"], function($, _, Backbone, ListItem, listTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "list",
        tagName: "div",

        /* view properties */
        headers: ["id", "title", "author", "price", "actions"],
        template: _.template(listTemplate),

        /* view methods */
        close: function() { $(this.el).unbind().remove(); },
        initialize: function() {
            this.collection.bind("reset", this.render, this);
            this.collection.bind("add", function(model) {
                $(this.el).find("tbody").prepend(new ListItem({ model: model }).render().el);
            }, this);
        },
        render: function() {
            var $el = $(this.el),
                $tbody = null;

            $el.html(this.template({
                caption: "My books",
                headers: this.headers
            }));

            $el.prepend("<p><a href='#books/add' class='btn'>Add book</a></p>");

            $tbody = $el.find("tbody");

            this.collection.each(function(model, index, list) {
                $tbody.append(new ListItem({ model: model }).render().el);
            });

            this.options.container.append(this.el);

            return this;
        }
    });

});