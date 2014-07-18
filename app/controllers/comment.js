/* global Trello */
import Ember from 'ember';

export default Ember.ObjectController.extend({
	isEditing: true,
	oldText: "",

	initOldText: function(){
		this.set("oldText", this.get("data.text"));
	}.on("init"),

	actions: {
		startEdit: function(){
			this.set("isEditing", true);
			this.set("oldText", this.get("data.text"));
		},

		cancelEdit: function(){
			this.set("data.text", this.get("oldText"));
			this.set("isEditing", false);
		},

		saveEdit: function(){
			// This should happen after success or failure.  Add a spinner.
			this.set("isEditing", false);

			var controller = this;
			var cardId = this.get("data.card.id");
			var commentId = this.get("id");

			var data = {
				text: this.get("data.text")
			};

			Trello.put("/cards/" + cardId + "/actions/" + commentId + "/comments/", data,
				function(response){
					console.log("comment edit saved", response);
					controller.set("text", response.data.text);
				},
				function(response){
					console.log("error saving comment edit", response);
				}
			);
		}
	}
});
