/*
	The progress-donut component displays a circular progress bar,
	with bound text in the center.

	Bind a property that varies between 0 and 1 to `completion`,
	to change the progress display, and bind to `text` to change
	the inner text.

	TODO: Prevent long text from spilling out of the donut

	Some appearance may be configured via CSS.  Notably the 
	.background and .foreground fill styles, to control the color
	of the ring.  .foreground corresponds to the arc that shows
	the progress.

	width and height may also be set via CSS.  Whichever dimension
	is smaller will be used for the donut radius, so it fits in the
	containing element.  The donut will also be centered along the
	larger dimension.

	The thickness of the donut may be configured via binding, 
	as a pixel width.
*/

/* global d3 */
import Ember from 'ember';

function arcTween(transition, newAngle, arc){
  transition.attrTween("d", function(d){
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t){
      d.endAngle = interpolate(t);
      return arc(d);
    };
  });
}

export default Ember.Component.extend({
	classNames: ["progress-donut"],
	thickness: 10,
	
	completion: 0, // [0, 1]

	tau: 2 * Math.PI,

	completionChanged: function(){
		var completion = this.get("completion");
		var foreground = this.get("foreground");
		var arc = this.get("arc");
		var tau = this.get("tau");

		foreground.transition()
			.duration(500)
			.call(arcTween, completion * tau, arc);
	}.observes("completion"),

	textChanged: function(){
		var textElement = this.get("textElement");
		var text = this.get("text");

		textElement.text(text);
	}.observes("text"),

	setupDonut: function(){
		var container = this.$()[0];

		var clientHeight = container.clientHeight;
		var clientWidth = container.clientWidth;
		var containerCapacity = Math.min(clientHeight, clientWidth);

		var tau = this.get("tau");
		var radius = containerCapacity / 2;
		var thickness = this.get("thickness");

		var arc = d3.svg.arc()
			.startAngle(0)
			.innerRadius(radius - thickness)
			.outerRadius(radius);
		this.set("arc", arc);

		var svg = d3.select(container)
			.append("svg")
				.attr("width", "100%")
				.attr("height", "100%")
			.append("g")
				.attr("transform", "translate(" + clientWidth / 2 + "," + clientHeight / 2 + ")");

		var meter = svg.append("g");

		meter.append("path")
			.attr("class", "background")
			.datum({ endAngle: tau })
			.attr("d", arc);

		var foreground = meter.append("path")
			.attr("class", "foreground")
			.datum({
				endAngle: this.get("completion") * tau
			})
			.attr("d", arc);
		this.set("foreground", foreground);

		var textElement = meter.append("text")
			.attr("text-anchor", "middle")
			.attr("dy", ".35em");
		this.set("textElement", textElement);
		textElement.text(this.get("text"));

		// Keep graph centered in container.
		d3.select(window).on("resize", function(){
			svg.attr("transform", "translate(" + container.clientWidth / 2 + "," + container.clientHeight / 2 + ")");
		});

	}.on("didInsertElement")
});
