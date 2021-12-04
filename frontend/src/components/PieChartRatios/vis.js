import * as d3 from "d3";

var x_var = "name";

var keys = ["truePositives", "falsePositives", "trueNegatives", "falseNegatives"];

let width = 900;
let height = 450;
let svg = d3.create("svg").attr("width", width).attr("height", height);

var color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"]);

var x = d3.scaleLinear().rangeRound([50, width]);

var x_axis = d3.axisBottom(x).tickSize(height);
// .tickFormat(function (d, i, ticks) {
// 	return i == ticks.length - 1 ? d + " value" : d;
// });

var y = d3.scaleBand().rangeRound([50, height]).domain(["Outcome"]).padding(0.25);

var y_axis = d3.axisRight(y).tickSize(0);

svg.append("g").attr("class", "x axis").attr("transform", "translate(0,50)").call(customXAxis);

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
	x.domain([
		0,
		Math.max.apply(
			null,
			groups.map(function (d) {
				return d.sum;
			})
		)
	]);

	y.domain(names);

	keys.forEach(function (key, key_index) {
		var bar = svg.selectAll(".bar-" + key).data(stack(groups)[key_index], function (d) {
			return d.data[x_var] + "-" + key;
		});

		bar.transition()
			.attr("x", function (d) {
				return x(d[0]);
			})
			.attr("y", function (d) {
				return y(d.data[x_var]);
			})
			.attr("width", function (d) {
				return x(d[1]) - x(d[0]);
			});

		bar.enter()
			.append("rect")
			.attr("class", function (d) {
				return "bar bar-" + key;
			})
			.attr("x", function (d) {
				return x(d[0]);
			})
			.attr("y", function (d) {
				return y(d.data[x_var]);
			})
			.attr("width", function (d) {
				return x(d[1]) - x(d[0]);
			})
			.attr("height", y.bandwidth())
			.attr("fill", function (d) {
				return color(key);
			});
	});

	svg.select(".y").transition().call(customYAxis);
	svg.select(".x").transition().call(customXAxis);

	var size = 20;
	var guessLength = 150;
	svg.selectAll("legenddots")
		.data(keys)
		.enter()
		.append("rect")
		.attr("x", function (d, i) {
			return 50 + i * guessLength;
		})
		.attr("y", function (d, i) {
			return 15;
		}) // 100 is where the first dot appears. 25 is the distance between dots
		.attr("width", size)
		.attr("height", size)
		.style("fill", function (d) {
			return color(d);
		});
	svg.selectAll("legendlabels")
		.data(keys)
		.enter()
		.append("text")
		.attr("x", function (d, i) {
			return 50 + i * guessLength + size + 5;
		})
		.attr("y", function (d, i) {
			return 30;
		}) // 100 is where the first dot appears. 25 is the distance between dots
		.style("fill", function (d) {
			return color(d);
		})
		.text(function (d) {
			switch (d) {
				case "truePositives":
					return "True positives";
				case "falsePositives":
					return "False positives";
				case "trueNegatives":
					return "True negatives";
				case "falseNegatives":
					return "False negatives";
			}
			return d;
		})
		.attr("text-anchor", "left")
		.style("alignment-baseline", "middle");
};

function customYAxis(g) {
	g.call(y_axis);
	g.call((g) => g.select(".domain").attr("transform", "translate(50,0)"));
	// g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
	g.selectAll(".tick text").attr("x", 2).attr("dy", -4);
}

function customXAxis(g) {
	g.call(x_axis);
	g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
	g.selectAll(".tick text").attr("y", 4).attr("dx", -4);
}
