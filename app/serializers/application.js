import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	/*
		The Trello payloads come back as flat objects, without
		the type key, so extractSingle and extractArray modify
		the payload to include them and then call _super()
	*/
	extractSingle: function(store, primaryType, payload, recordId){
		var normalizedPayload = {};
		normalizedPayload[primaryType.typeKey] = payload;

		return this._super(store, primaryType, normalizedPayload, recordId);
	},

	extractArray: function(store, primaryType, payload){
		var pluralizedTypeName = Ember.Inflector.inflector.pluralize(primaryType.typeKey);
		var normalizedPayload = {};
		normalizedPayload[pluralizedTypeName] = payload;

		return this._super(store, primaryType, normalizedPayload);
	}
});
