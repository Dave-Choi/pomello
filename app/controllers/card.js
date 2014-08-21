/* global Trello */

import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ["user"],
	userBinding: "controllers.user",

	commentsBadge: function(){
		return this.get("comments.length") || this.get("commentCount");
	}.property("comments.length"),

	actions: {
		createComment: function(text){
			var controller = this;

			var newComment = this.store.createRecord("comment", {
				text: text,
				card: this.get("model"),
				creator: this.get("user.model")
			});

			newComment.save()
			.then(
				function(comment){
					return controller.get("comments")
					.then(function(comments){
						comments.unshiftObject(comment);
						controller.send("resetCommentForm");
					});
				}
			);
		},

		deleteComment: function(comment){
			var controller = this;
			var cardId = this.get("id");
			var commentId = comment.id;

			Trello.delete("/cards/" + cardId + "/actions/" + commentId + "/comments",
				function(response){
					console.log("comment delete success", response);
					controller.get("comments").removeObject(comment);
				},
				function(response){
					console.log("comment delete failure", response);
				}
			);
		}
	}
});
