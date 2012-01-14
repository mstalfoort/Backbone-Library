define([    "jquery", "underscore", "backbone", "text!templates/details.html"
], function( $,        _,            Backbone,   detailsTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "details",
        tagName: "div",

        /* view properties */
        template: _.template(detailsTemplate),

        /* element methods */
        close: function() { $(this.el).unbind().remove(); },
        render: function() {
            $(this.el).html(this.template({
                details: [
                    { label: "artist", value: this.model.get("artist") },
                    { label: "album", value: this.model.get("album") },
                    { label: "length", value: this.model.get("length") },
                    { label: "genre", value: this.model.get("genre") },
                    { label: "year", value: this.model.get("year") }
                ],
                title: this.model.get("title"),
                type: "track"
            }));
            this.options.container.append(this.el);
            return this;
        }
    });

});