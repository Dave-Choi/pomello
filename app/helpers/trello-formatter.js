/* global markdown, emojify */

/*
	This does the basic text filtering that Trello does, allowing
	for the use of emoji and markdown in text fields.

	The fidelity isn't perfect, in that Trello's doesn't
	allow the use of headers in comments, and some other things.

	Detailed here: http://blog.trello.com/emoji-and-markdown-everywhere/

	The emoji filter is also somewhat unsophisticated, in that
	`:tomato:some text` without a trailing space won't add the emoji,
	while Trello does.
*/

/*
	When saving comments, the Trello JSON response includes an
	array of entities, and the fourth entry contains a property
	called "textHtml" (i.e. `response.entities[3].textHtml`), 
	which includes the markdown filtered content, but this isn't
	included in the comments listing response from:
	
	trello.com/1/cards/<cardId>/actions/comments

	But this is a possibility in the future to remove this helper.
*/

// Maybe find a better place for this
emojify.setConfig({
	img_dir: "assets/images/emoji"
});

import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value){
	var markdowned = markdown.toHTML(value);
	var emojified = emojify.replace(markdowned);	

	return new Ember.Handlebars.SafeString(emojified);
});
