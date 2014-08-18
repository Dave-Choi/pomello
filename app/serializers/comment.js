//import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
	normalize: function(type, hash, prop){
		hash.text = hash.data.text;
		hash.card = hash.data.card.id;
		hash.creator = hash.memberCreator.id;
		
		return this._super(type, hash, prop);
	}
});
