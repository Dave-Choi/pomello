import Ember from 'ember';
import DS from 'ember-data';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
	findAll: function(store, type, sinceToken){
	/*
		Trello uses one URL for getting individual cards, but to
		access any sets of cards, it's got a different namespace.

		In our case, we want the cards assigned to the logged in user
		at members/me/cards
	*/
		
		var query;
		if(sinceToken){
			query = { since: sinceToken };
		}
		return this.ajax("https://trello.com/1/members/me/cards", "GET", { data: query });
	}
});
