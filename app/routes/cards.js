import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
	model: function(){
		return this.store.find("card");
	}
});
