import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
	normalize: function(type, hash, prop){
		hash.commentCount = hash.badges.comments;
		return this._super(type, hash, prop);
	}
});
