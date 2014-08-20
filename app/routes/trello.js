import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
	model: function(){
		return this.store.find("member", "me");
	},

	setupController: function(controller, model){
		var userController = this.controllerFor("user");
		userController.set("model", model);
	}
});
