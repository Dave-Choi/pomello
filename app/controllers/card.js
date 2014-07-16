/* global Trello */

import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ["user"],
	userBinding: "controllers.user",

	actions: {
		createComment: function(text){
			var cardId = this.get("id");
			var controller = this;

			var data = {
				text: text
			};

			Trello.post("cards/" + cardId + "/actions/comments", data,
				function(response){
					console.log("comment saved", response);
					controller.get("comments").unshiftObject(response);
				},
				function(response){
					console.log("error saving comment", response);
				}
			);
		}
	}
});
