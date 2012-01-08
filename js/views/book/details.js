define(["jquery", "underscore", "backbone", "text!templates/book/details.html"], function($, _, Backbone, detailsTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "details",
        tagName: "div",

        /* view properties */
        labels: ["author", "publisher", "date", "isbn", "format", "pages", "price"],
        template: _.template(detailsTemplate),

        /* view methods */
        close: function() { $(this.el).unbind().remove(); },
        render: function() {
            $(this.el).html(this.template({
                description: this.model.get("description"),
                details: [
                    this.model.get("author"),
                    this.model.get("publisher"),
                    this.model.get("date"),
                    "<a href='" + this.model.get("url") + "'>" + this.model.get("isbn") + "</a>",
                    this.model.get("format").toLowerCase(),
                    this.model.get("pages"),
                    "$ " + this.model.get("price")
                ],
                labels: this.labels,
                title: this.model.get("title")
            }));
            this.options.container.append(this.el);
            return this;
        }
    });

});