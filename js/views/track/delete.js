define([    "jquery", "underscore", "backbone", "text!templates/delete.html"
], function( $,        _,            Backbone,   deleteTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "delete",
        tagName: "div",

        /* view properties */
        events: { "click #btn-yes": "deleteTrack" },
        template: _.template(deleteTemplate),

        /* element methods */
        close: function() {
            $(this.el).unbind().remove();
        },
        render: function() {
            $(this.el).html(this.template({
                title: this.model.get("title"),
                type: "track"
            }));
            this.options.container.append(this.el);
            return this;
        },

        /* event methods */
        deleteTrack: function(event) {
            event.preventDefault();
            this.model.destroy({
                success: function() {
                    window.location.hash = "tracks";
                }
            });
        }
    });

});