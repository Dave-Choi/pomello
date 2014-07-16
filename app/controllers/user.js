/* global Trello */
import Ember from 'ember';

export default Ember.ObjectController.extend({
	isAuthorized: false,
	fullName: "",
	token: "",
	previousTransition: null,

	authorizationSuccess: function(){
		this.set("isAuthorized", true);
		this.set("token", Trello.token());
	},

	checkAuthorized: function(){
		var controller = this;
		Trello.authorize({
			interactive: false,
			scope: {
				read: true,
				write: true
			},
			success: function(){
				controller.authorizationSuccess();
			}
		});
	}.on("init"),

	actions: {
		authorize: function(){
			var controller = this;
			Trello.authorize({
				type: "popup",
				name: "Pomello",
				scope: {
					read: true,
					write: true
				},
				success: function(){
					controller.authorizationSuccess();
					controller.transitionTo("trello");
				}
			});
		},

		deauthorize: function(){
			Trello.deauthorize();
			this.set("isAuthorized", false);
			this.transitionToRoute("index");
		}
	}
});
