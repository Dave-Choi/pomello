import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:cards', 'CardsController', {
	// Specify the other units that are required for this test.
	// needs: ['controller:card', 'controller:user']
});

// Replace this with your real tests.
test('it exists', function() {
	var controller = this.subject();
	ok(controller);
});

test('it filters cards based on filterString', function(){
	var controller = this.subject();

	// The normal itemController ("card") adds a bunch of dependencies we're not interested in for this test.
	controller.set("itemController", null);

	controller.set("content", [
		Ember.Object.create({
			name: "Make a test suite.",
			desc: "Add unit, integration and acceptance tests.",
			board: {
				name: "Programming"
			}
		}),
		Ember.Object.create({
			name: "Make a test sweet.",
			desc: "<3",
			board: {
				name: "Programming"
			}
		}),
		Ember.Object.create({
			name: "Make a baked potato.",
			desc: "Dock the skin, oil, salt, and throw in the oven.  (If you don't dock it, it can explode.  I've seen it.)",
			board: {
				name: "Cooking"
			}
		}),
	]);

	var filtered;

	filtered = controller.get("filtered");
	deepEqual(filtered.get("length"), controller.get("length"), "If no filter is applied, `filtered` should be the full set of content.");

	// Contained in "Make a test suite.", "Make a test sweet."
	controller.set("filterString", "test"); 
	filtered = controller.get("filtered");
	deepEqual(2, filtered.get("length"), "A basic string filter should check the card name for the target text.");

	// Contained in "Add unit, integration and acceptance tests.", "Dock the skin, oil, salt, and throw in the oven.  (If you don't dock it, it can explode.  I've seen it.)"
	controller.set("filterString", "and"); 
	filtered = controller.get("filtered");
	deepEqual(2, filtered.get("length"), "A basic string filter should check the card description for the target text.");

	// Only contained in board name for card named "Make a baked potato."
	controller.set("filterString", "Cooking");
	filtered = controller.get("filtered");
	deepEqual(1, filtered.get("length"), "A basic string filter should check the card's board's name for the target text.");

	// Character set includes '(' in description for "Make a baked potato" and '<' in description for "Make a test sweet"
	controller.set("filterString", "[(<]");
	filtered = controller.get("filtered");
	deepEqual(2, filtered.get("length"), "Filters should be regex aware.");
});
