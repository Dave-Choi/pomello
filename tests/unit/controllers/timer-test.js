import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:timer', 'TimerController', {
	// Specify the other units that are required for this test.
	// needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function() {
	var controller = this.subject();
	ok(controller);
});

test("#remaining", function(){
	expect(2);

	var controller = this.subject();
	var remaining;

	controller.set("duration", 10000);
	remaining = controller.get("remaining");
	deepEqual(10000, remaining,
		"#remaining is equal to duration without setting #time."
	);

	controller.set("time", 2500);
	remaining = controller.get("remaining");
	deepEqual(7500, remaining,
		"#remaining is reduced by elapsed #time."
	);
});

test("#completion", function(){
	expect(4);

	var controller = this.subject();
	var completion;

	controller.set("duration", 100);
	completion = controller.get("completion");
	deepEqual(0, completion,
		"#completion is equal to 0 without setting #time."
	);

	controller.setProperties({
		duration: 100,
		time: 25
	});
	completion = controller.get("completion");
	deepEqual(0.25, completion,
		"#completion is equal to the ratio between #time and #duration."
	);

	controller.setProperties({
		duration: 100,
		time: 100
	});
	completion = controller.get("completion");
	deepEqual(1, completion,
		"#completion is equal to 1 when #time is equal to #duration."
	);

	controller.setProperties({
		duration: 100,
		time: 110
	});
	completion = controller.get("completion");
	deepEqual(1, completion,
		"#completion is equal to 1 when #time is greater than #duration."
	);
});
