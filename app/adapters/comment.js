import Ember from 'ember';
import DS from 'ember-data';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
	findQuery: function(store, type, query){
		var url = "https://trello.com/1/cards/" + query.card + "/actions?filter=commentCard";
		return this.ajax(url, 'GET');
	},

	createRecord: function(store, type, record){
		var cardID = record.get("card.id");
		var data = {
			text: record.get("text"),
			key: this.get("key"),
			token: this.get("token")
		};

		var url = "https://trello.com/1/cards/" + cardID + "/actions/comments";

		return Ember.$.post(url, data);
	}
});
