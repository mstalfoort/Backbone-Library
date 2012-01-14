define([    "jquery", "underscore", "backbone", "text!templates/list-item.html"
], function( $,        _,            Backbone,   listItemTemplate) {

    return Backbone.View.extend({
        /* element properties */
        tagName: "tr",

        /* view properties */
        template: _.template(listItemTemplate),

        /* element methods */
        render: function() {
            var id = this.model.get("id");

            $(this.el).html(this.template({
                data: [
                    id,
                    "<a href='#tracks/" + id + "/show'>" + this.model.get("title") + "</a>",
                    this.model.get("artist"),
                    this.model.get("genre"),
                    "<a href='#tracks/" + id + "/edit'>edit</a> | <a href='#tracks/" + id + "/delete' class='delete'>delete</a>"
                ]
            }));
            return this;
        }
    });

});