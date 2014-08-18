import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	dateLastActivity: DS.attr("date"),
	due: DS.attr("date"),

	desc: DS.attr("string"),

	// idBoard: DS.belongsTo("board"),
	// idList: DS.belongsTo("list"),

	// idMembers: DS.hasMany("member"),
	// idShort: DS.attr("number"),
	// labels: DS.hasMany("label"),

	description: Ember.computed.alias("desc"),

	name: DS.attr("string"),
	shortURL: DS.attr("string"),

	commentCount: DS.attr("number"),
	comments: DS.hasMany("comment", { async: true })
});
