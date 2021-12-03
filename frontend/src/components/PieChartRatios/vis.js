import * as d3 from "d3";

var x_var = "name";

var keys = ["truePositives", "falsePositives", "trueNegatives", "falseNegatives"];

let width = 900;
let height = 900;
let svg = d3.create("svg").attr("width", width).attr("height", height);

var color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"]);

var y = d3.scaleLinear().rangeRound([height, 0]);

var y_axis = d3
	.axisRight(y)
	.tickSize(width)
	.tickFormat(function (d, i, ticks) {
		return i == ticks.length - 1 ? d + " value" : d;
	});

var x = d3.scaleBand().rangeRound([0, width]).domain(["Outcome"]).padding(0.25);

var x_axis = d3.axisBottom(x);

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(x_axis);

svg.append("g").attr("class", "y axis").call(customYAxis);

var stack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone);

// Source: https://observablehq.com/@d3/zoomable-circle-packing
export const draw = (groups, newLinks) => {
	d3.select(".vis-pie-chart").append(() => svg.node());

	groups = groups.map((g) => {
		g.sum = g.truePositives + g.falsePositives + g.trueNegatives + g.falseNegatives;
		return g;
	});

	var names = groups.map((g) => g.name);

	console.log(
		groups.map(function (d) {
			return d.sum;
		})
	);
	y.domain([
		0,
		Math.max.apply(
			null,
			groups.map(function (d) {
				return d.sum;
			})
		)
	]);

	svg.select(".y").transition().call(customYAxis);

	x.domain(names);

	svg.select(".x").transition().call(customXAxis);

	keys.forEach(function (key, key_index) {
		var bar = svg.selectAll(".bar-" + key).data(stack(groups)[key_index], function (d) {
			return d.data[x_var] + "-" + key;
		});

		bar.transition()
			.attr("x", function (d) {
				return x(d.data[x_var]);
			})
			.attr("y", function (d) {
				return y(d[1]);
			})
			.attr("height", function (d) {
				return y(d[0]) - y(d[1]);
			});

		bar.enter()
			.append("rect")
			.attr("class", function (d) {
				return "bar bar-" + key;
			})
			.attr("x", function (d) {
				return x(d.data[x_var]);
			})
			.attr("y", function (d) {
				return y(d[1]);
			})
			.attr("height", function (d) {
				return y(d[0]) - y(d[1]);
			})
			.attr("width", x.bandwidth())
			.attr("fill", function (d) {
				return color(key);
			});
	});
};

function customYAxis(g) {
	g.call(y_axis);
	g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
	g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
}

function customXAxis(g) {
	g.call(x_axis);
	g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
	g.selectAll(".tick text").attr("y", 4).attr("dx", -4);
}
