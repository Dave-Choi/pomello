import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
	normalize: function(type, hash, prop){
		hash.commentCount = hash.badges.comments;
		hash.shortURL = hash.shortUrl;
		hash.board = hash.idBoard;
		return this._super(type, hash, prop);
	}
});
