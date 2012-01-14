define([    "jquery", "underscore", "backbone", "text!templates/edit.html"
], function( $,        _,            Backbone,   editTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "edit",
        tagName: "div",

        /* view properties */
        events: { "click #btn-save": "saveTrack" },
        template: _.template(editTemplate),

        /* element methods */
        close: function() { $(this.el).unbind().remove(); },
        render: function() {
            var fields = [];

            _.each(this.model.fields, function(field) {
                fields.push(_.extend(field, { value: this.model.get(field.label) }));
            }, this);

            $(this.el).html(this.template({
                fields: fields,
                title: this.model.get("title"),
                type: "track"
            }));
            this.options.container.append(this.el);
            return this;
        },

        /* event methods */
        saveTrack: function(event) {
            var newData = {};

            event.preventDefault();

            _.each(this.model.fields, function(field, index, fields) {
                newData[field.label] = $("#input-" + field.label).val();
            }, this);

            this.model.set(newData);
            this.model.save();
            window.location.hash = "tracks";

        }
    });

});