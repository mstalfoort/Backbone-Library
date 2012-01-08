require.config({
    baseUrl: "js",
    paths: {
        jquery: "libs/jquery/jquery",
        underscore: "libs/backbone/underscore",
        backbone: "libs/backbone/backbone",
        text: "libs/require/text"
    }
});

require(["routers/library", "backbone"], function(Library, Backbone) {
    var myLibrary = new Library({
        appContainer: "#my-library"
    });
    Backbone.history.start();
});