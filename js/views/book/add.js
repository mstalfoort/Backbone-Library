define(["jquery", "underscore", "backbone", "text!templates/book/add.html"], function($, _, Backbone, addTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "add",
        tagName: "div",

        /* view properties */
        events: { "click #btn-save": "saveBook" },
        labels: ["title", "description", "author", "publisher", "date", "isbn", "format", "pages", "price", "url"],
        template: _.template(addTemplate),

        /* view methods */
        close: function() { $(this.el).unbind().remove(); },
        render: function() {
            $(this.el).html(this.template({
                labels: this.labels,
                type: "book"
            }));
            this.options.container.append(this.el);
            return this;
        },
        saveBook: function(event) {
            var newData = {};

            event.preventDefault();

            _.each(this.labels, function(label, index, labels) {
                newData[label] = $("#input-" + label).val();
            }, this);

            this.model.set(newData);
            this.collection.create(this.model);
            window.location.hash = "";
        }
    });

});