import AuthorizedRoute from '../authorized';

export default AuthorizedRoute.extend({
	afterModel: function(){
		this.transitionTo("cards");
	}
});
