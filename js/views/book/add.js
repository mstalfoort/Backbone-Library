define([
           "jquery", "underscore", "backbone", "text!templates/book/add.html"
],function( $,        _,            Backbone,   addTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "add",
        tagName: "div",

        /* view properties */
        events: { "click #btn-save": "saveBook" },
        template: _.template(addTemplate),

        /* element methods */
        close: function() {
            $(this.el).unbind().remove();
        },
        render: function() {
            $(this.el).html(this.template({
                fields: this.model.fields,
                type: "book"
            }));
            this.options.container.append(this.el);
            return this;
        },

        /*  event methods */
        saveBook: function(event) {
            var newData = {};

            event.preventDefault();

            _.each(this.model.fields, function(field, index, fields) {
                newData[field.label] = $("#input-" + field.label).val();
            }, this);

            this.model.set(newData);
            this.collection.create(this.model);
            window.location.hash = "";
        }
    });

});