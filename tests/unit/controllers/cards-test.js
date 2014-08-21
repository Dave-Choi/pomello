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
			desc: "Add unit, integration and acceptance tests."
		}),
		Ember.Object.create({
			name: "Make a test sweet.",
			desc: "<3"
		}),
		Ember.Object.create({
			name: "Make a baked potato.",
			desc: "Dock the skin, oil, salt, and throw in the oven.  (If you don't dock it, it can explode.  I've seen it.)"
		}),
	]);

	var filtered;

	filtered = controller.get("filtered");
	deepEqual(filtered.get("length"), controller.get("length"), "If no filter is applied, `filtered` should be the full set of content.");

	controller.set("filterString", "test");
	filtered = controller.get("filtered");
	deepEqual(2, filtered.get("length"), "A basic string filter should check the card name for the target text.");

	controller.set("filterString", "and");
	filtered = controller.get("filtered");
	deepEqual(2, filtered.get("length"), "A basic string filter should check the card description for the target text.");

	controller.set("filterString", "[(<]");
	filtered = controller.get("filtered");
	deepEqual(2, filtered.get("length"), "Filters should be regex aware.");
});
