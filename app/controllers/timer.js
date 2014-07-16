/* global moment */

import Ember from 'ember';

function minutesToMilliseconds(minutes){
	return minutes * 60 * 1000;
}

export default Ember.Controller.extend({
	duration: minutesToMilliseconds(25),
	startTime: null,
	time: 0,
	
	isTiming: false,
	timeoutID: null,

	taskDescription: "",
	notes: "",
	isTaskDescriptionEmpty: Ember.computed.empty("taskDescription"),

	placeholder: function(){
		return "My focus for the next " + moment.duration(this.get("duration")).humanize() + " is ...";
	}.property("duration"),

	remaining: function(){
		return this.get("duration") - this.get("time");
	}.property("time", "duration"),

	remainingString: function(){
		var remaining = this.get("remaining");
		if(remaining <= 0){
			return "finished";
		}
		return moment.duration(remaining).humanize();
	}.property("remaining"),

	completion: function(){
		return this.get("time") / this.get("duration");
	}.property("time", "duration"),

	stepTime: function(){
		var controller = this;
		this.set("time", Date.now() - this.get("startTime"));

		var time = this.get("time");
		var duration = this.get("duration");

		if(time >= duration){
			// Do whatever happens when the timer's done.
			this.send("stop");
		}
		else{
			var timeoutID = setTimeout(function(){
				controller.stepTime();
			}, 1000);
			this.set("timeoutID", timeoutID);
		}
		
	},

	actions: {
		start: function(){
			this.set("isTiming", true);
			this.set("startTime", Date.now());
			this.stepTime();
		},

		stop: function(){
			clearTimeout(this.get("timeoutID"));
			this.send("createComment", "**:tomato: " + this.get("taskDescription") + "**\n\n" + this.get("notes"));
			this.set("isTiming", false);
		}
	}
});
