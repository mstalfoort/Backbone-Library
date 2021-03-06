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
                    { label: "description", value: this.model.get("description") },
                    { label: "author", value: this.model.get("author") },
                    { label: "publisher", value: this.model.get("publisher") },
                    { label: "date", value: this.model.get("date") },
                    { label: "isbn", value: "<a href='" + this.model.get("url") + "'>" + this.model.get("isbn") + "</a>" },
                    { label: "format", value: this.model.get("format").toLowerCase() },
                    { label: "pages", value: this.model.get("pages") },
                    { label: "price", value: "$ " + this.model.get("price") }
                ],
                title: this.model.get("title"),
                type: "book"
            }));
            this.options.container.append(this.el);
            return this;
        }
    });

});