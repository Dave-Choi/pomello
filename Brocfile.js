/* global require, module */

var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');

app.import("bower_components/d3/d3.min.js");

app.import("bower_components/moment/min/moment.min.js");

// TODO: Make minified version of this.
app.import("bower_components/markdown-js/lib/markdown.js");

app.import("bower_components/favico.js/favico-0.3.5.min.js");

app.import("bower_components/font-awesome/css/font-awesome.min.css");
var fontawesomeFonts = pickFiles('bower_components/font-awesome/fonts', {
    srcDir: '/',
    files: [
        'fontawesome-webfont.ttf',
        'fontawesome-webfont.woff',
        'fontawesome-webfont.eot',
        'FontAwesome.otf',
        'fontawesome-webfont.svg'
    ],
    destDir: '/fonts'
});

app.import({
  development: "bower_components/emojify/emojify.js",
  production: "bower_components/emojify/emojify.min.js"
});

/* 
  The emojify package contains close to 900 images 
  and will slow down the build dramatically.  
  Feel free to delete them from your local bower_components
  to speed it up.
*/
var emojiImages = pickFiles("bower_components/emojify/images/emoji", {
	srcDir: "/",
	files: ["**.png"],
	destDir: "/assets/images/emoji"
});

module.exports = app.toTree([emojiImages, fontawesomeFonts]);
