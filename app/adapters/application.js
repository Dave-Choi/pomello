import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: "https://trello.com",
	namespace: "1",
	key: "69ea5c8500ae4ff25ecfdd6e4d92a561",
	token: Ember.computed.alias("user.token"),
	
	ajaxOptions: function(url, type, hash){
		// TODO: Get advice on whether this is better done here or in RESTAdapter.ajax
		hash = hash || { data: {} };
		hash.data = hash.data || {};
		
		hash.data.key = this.get("key");
		hash.data.token = this.get("token");

		return this._super(url, type, hash);
	}
});
