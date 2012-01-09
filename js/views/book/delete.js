define([    "jquery", "underscore", "backbone", "text!templates/book/delete.html"
], function( $,        _,            Backbone,   deleteTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "delete",
        tagName: "div",

        /* view properties */
        events: { "click #btn-yes": "deleteBook" },
        template: _.template(deleteTemplate),

        /* element methods */
        close: function() {
            $(this.el).unbind().remove();
        },
        render: function() {
            $(this.el).html(this.template({
                title: this.model.get("title"),
                type: "book"
            }));
            this.options.container.append(this.el);
            return this;
        },

        /* event methods */
        deleteBook: function(event) {
            event.preventDefault();
            this.model.destroy({
                success: function() {
                    window.location.hash = "";
                }
            });
        }
    });

});