define(["jquery", "underscore", "backbone", "text!templates/book/edit.html"], function($, _, Backbone, editTemplate) {

	return Backbone.View.extend({
		/* element properties */
		className: "view",
		id: "edit",
		tagName: "div",

		/* view properties */
		events: { "click #btn-save": "saveBook" },
		labels: ["title", "description", "author", "publisher", "date", "isbn", "format", "pages", "price", "url"],
		template: _.template(editTemplate),

		/* view methods */
		close: function() { $(this.el).unbind().remove(); },
		render: function() {
			$(this.el).html(this.template({
				values: [
					this.model.get("title"),
					this.model.get("description"),
					this.model.get("author"),
					this.model.get("publisher"),
					this.model.get("date"),
					this.model.get("isbn"),
					this.model.get("format").toLowerCase(),
					this.model.get("pages"),
					this.model.get("price"),
					this.model.get("url")
				],
				labels: this.labels,
				title: this.model.get("title"),
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
			this.model.save();
			window.location.hash = "";

		}
	});

});