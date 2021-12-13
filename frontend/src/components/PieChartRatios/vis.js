import * as d3 from "d3";

var x_var = "name";

var keys = ["truePositives", "falsePositives", "trueNegatives", "falseNegatives"];

var color = d3.scaleOrdinal(["#66C2A5", "#FC8D62", "#8DA0CB", "#E78AC3"]);

// Source: https://observablehq.com/@d3/zoomable-circle-packing
export const draw = (groups, size) => {
	d3.select(".vis-pie-chart > *").remove();

	let width = size.width;
	let height = size.height;
	let svg = d3.create("svg").attr("width", width).attr("height", height);

	let x = d3.scaleLinear().rangeRound([50, width]);
	let x_axis = d3.axisBottom(x).tickSize(height);
	let y = d3.scaleBand().rangeRound([50, height]).domain(["Outcome"]).padding(0.25);
	let y_axis = d3.axisRight(y).tickSize(0);

	svg.append("g").attr("class", "x axis").attr("transform", "translate(0,50)").call(customXAxis);
	svg.append("g").attr("class", "y axis").call(customYAxis);

	let stack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone);

	d3.select(".vis-pie-chart").append(() => svg.node());

	groups = groups.map((g) => {
		g.sum = g.truePositives + g.falsePositives + g.trueNegatives + g.falseNegatives;
		return g;
	});

	var names = groups.map((g) => g.name);
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

	var legendDotSize = 20;
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
		.attr("width", legendDotSize)
		.attr("height", legendDotSize)
		.style("fill", function (d) {
			return color(d);
		});
	svg.selectAll("legendlabels")
		.data(keys)
		.enter()
		.append("text")
		.attr("x", function (d, i) {
			return 50 + i * guessLength + legendDotSize + 5;
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

	function customYAxis(g) {
		g.call(y_axis);
		g.call((g) => g.select(".domain").attr("transform", "translate(50,0)"));
		// g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
		g.selectAll(".tick text").attr("x", 2);
	}

	function customXAxis(g) {
		g.call(x_axis);
		g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
		g.selectAll(".tick text").attr("y", 4).attr("dx", -4);
	}
};
