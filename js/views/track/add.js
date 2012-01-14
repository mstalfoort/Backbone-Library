define([    "jquery", "underscore", "backbone", "text!templates/add.html"
], function( $,        _,            Backbone,   addTemplate) {

    return Backbone.View.extend({
        /* element properties */
        className: "view",
        id: "add",
        tagName: "div",

        /* view properties */
        events: { "click #btn-save": "saveTrack" },
        template: _.template(addTemplate),

        /* data methods */
        getLists: function(fields) {
            var lists = {};

            _.each(fields, function(item, index, list) {
                if (item.type === "list") {
                    $.ajax({
                        async: false,
                        dataType: "json",
                        success: function(data) {
                            lists[item.label] = data;
                        },
                        type: "get",
                        url: item.src
                    });
                };
            });

            return lists;
        },

        /* element methods */
        close: function() {
            $(this.el).unbind().remove();
        },
        render: function() {
            $(this.el).html(this.template({
                fields: this.model.fields,
                lists: this.getLists(this.model.fields),
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
            this.collection.create(this.model);
            window.location.hash = "tracks";
        }
    });
});