/* 
	Adds a mock Trello object to window.  This replaces the 
	Trello object from Trello's client.js, which is included
	in the index.html of the actual app.

	Using Ember-CLI 0.0.39:
		For some reason, this was failing to inject properly as
		a test helper, so it has to be included manually in test
		files that need the Trello global.

	e.g.
	import TrelloMock from 'pomello/tests/helpers/trello-mock';

	setup:
		TrelloMock.setupTrello();
	teardown:
		TrelloMock.teardownTrello();
*/

import Ember from 'ember';

export default {
	setupTrello: function(){
		window.Trello = {
			authorize: function(options){
				this.token = function(){
					return "fakeUserAuthorizationToken";
				};

				options.success();
			}
		};
	},

	teardownTrello: function(){
		delete window.Trello;
	}
};
