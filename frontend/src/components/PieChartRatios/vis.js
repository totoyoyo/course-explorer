import * as d3 from "d3";

// // Copyright 2021 Observable, Inc.
// // Released under the ISC license.
// // https://observablehq.com/@d3/stacked-horizontal-bar-chart
// function StackedBarChart(
// 	data,
// 	{
// 		x = (d) => d, // given d in data, returns the (quantitative) x-value
// 		y = (d, i) => i, // given d in data, returns the (ordinal) y-value
// 		z = () => 1, // given d in data, returns the (categorical) z-value
// 		title, // given d in data, returns the title text
// 		marginTop = 30, // top margin, in pixels
// 		marginRight = 0, // right margin, in pixels
// 		marginBottom = 0, // bottom margin, in pixels
// 		marginLeft = 75, // left margin, in pixels
// 		width = 800, // outer width, in pixels
// 		height, // outer height, in pixels
// 		xType = d3.scaleLinear, // type of x-scale
// 		xDomain, // [xmin, xmax]
// 		xRange = [marginLeft, width - marginRight], // [left, right]
// 		yDomain, // array of y-values
// 		yRange, // [bottom, top]
// 		yPadding = 0.1, // amount of y-range to reserve to separate bars
// 		zDomain, // array of z-values
// 		offset = d3.stackOffsetDiverging, // stack offset method
// 		order = d3.stackOrderNone, // stack order method
// 		xFormat, // a format specifier string for the x-axis
// 		xLabel, // a label for the x-axis
// 		colors = d3.schemeTableau10 // array of colors
// 	} = {}
// ) {
// 	const bars = svg.selectAll(".bars");
// 	// Compute values.
// 	const X = d3.map(data, x);
// 	const Y = d3.map(data, y);
// 	const Z = d3.map(data, z);
//
// 	// Compute default y- and z-domains, and unique them.
// 	if (yDomain === undefined) yDomain = Y;
// 	if (zDomain === undefined) zDomain = Z;
// 	yDomain = new d3.InternSet(yDomain);
// 	zDomain = new d3.InternSet(zDomain);
//
// 	// Omit any data not present in the y- and z-domains.
// 	const I = d3.range(X.length).filter((i) => yDomain.has(Y[i]) && zDomain.has(Z[i]));
//
// 	// If the height is not specified, derive it from the y-domain.
// 	if (height === undefined) height = yDomain.size * 25 + marginTop + marginBottom;
// 	if (yRange === undefined) yRange = [height - marginBottom, marginTop];
//
// 	// Compute a nested array of series where each series is [[x1, x2], [x1, x2],
// 	// [x1, x2], …] representing the x-extent of each stacked rect. In addition,
// 	// each tuple has an i (index) property so that we can refer back to the
// 	// original data point (data[i]). This code assumes that there is only one
// 	// data point for a given unique y- and z-value.
// 	const series = d3
// 		.stack()
// 		.keys(zDomain)
// 		.value(([, I], z) => X[I.get(z)])
// 		.order(order)
// 		.offset(offset)(
// 			d3.rollup(
// 				I,
// 				([i]) => i,
// 				(i) => Y[i],
// 				(i) => Z[i]
// 			)
// 		)
// 		.map((s) => s.map((d) => Object.assign(d, { i: d.data[1].get(s.key) })));
//
// 	// Compute the default y-domain. Note: diverging stacks can be negative.
// 	if (xDomain === undefined) xDomain = d3.extent(series.flat(2));
//
// 	// Construct scales, axes, and formats.
// 	const xScale = xType(xDomain, xRange);
// 	const yScale = d3.scaleBand(yDomain, yRange).paddingInner(yPadding);
// 	const color = d3.scaleOrdinal(zDomain, colors);
// 	const xAxis = d3.axisTop(xScale).ticks(width / 80, xFormat);
// 	const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);
//
// 	// Compute titles.
// 	if (title === undefined) {
// 		const formatValue = xScale.tickFormat(100, xFormat);
// 		title = (i) => `${Y[i]}\n${Z[i]}\n${formatValue(X[i])}`;
// 	} else {
// 		const O = d3.map(data, (d) => d);
// 		const T = title;
// 		title = (i) => T(O[i], i, data);
// 	}
//
// 	svg.append("g")
// 		.attr("class", "bars")
// 		.attr("transform", `translate(0,${marginTop})`)
// 		.call(xAxis)
// 		.call((g) => g.select(".domain").remove())
// 		.call((g) =>
// 			g
// 				.attr("class", "bars")
// 				.selectAll(".tick line")
// 				.clone()
// 				.attr("y2", height - marginTop - marginBottom)
// 				.attr("stroke-opacity", 0.1)
// 		)
// 		.call((g) =>
// 			g
// 				.append("text")
// 				.attr("class", "bars")
// 				.attr("x", width - marginRight)
// 				.attr("y", -22)
// 				.attr("fill", "currentColor")
// 				.attr("text-anchor", "end")
// 				.text(xLabel)
// 		);
//
// 	const bar = svg
// 		.append("g")
// 		.attr("class", "bars")
// 		.selectAll("g")
// 		.data(series)
// 		.join("g")
// 		.attr("fill", ([{ i }]) => color(Z[i]))
// 		.selectAll("rect")
// 		.data((d) => d)
// 		.join("rect")
// 		.attr("x", ([x1, x2]) => Math.min(xScale(x1), xScale(x2)))
// 		.attr("y", ({ i }) => yScale(Y[i]))
// 		.attr("width", ([x1, x2]) => Math.abs(xScale(x1) - xScale(x2)))
// 		.attr("height", yScale.bandwidth());
//
// 	if (title) bar.append("title").text(({ i }) => title(i));
//
// 	svg.append("g")
// 		.attr("transform", `translate(${xScale(0)},0)`)
// 		.attr("class", "bars")
// 		.call(yAxis);
//
// 	return Object.assign(svg.node(), { scales: { color } });
// }
//
// const pack = (data) =>
// 	d3
// 		.pack()
// 		.size([width, height])
// 		.padding(5)
// 		.radius((d) => 10)(data);
//
// // recursively sets child pack x and y positions relative to its parent
// const setPackXY = (n, prevX, prevY, prevPX, prevPY) => {
// 	n.pack_x = n.x - prevX + prevPX;
// 	n.pack_y = n.y - prevY + prevPY;
// 	if (n.children) {
// 		n.children.forEach((d) => {
// 			setPackXY(d, n.x, n.y, n.pack_x, n.pack_y);
// 		});
// 	}
// };
//
// const getStroke = (d) => {
// 	if (d.depth === 1) {
// 		return "black";
// 	}
// };
//
// const getColor = (d) => {
// 	if (d.depth === 3) {
// 		return d.parent.data.name === "true" ? "#ffbde0" : "#bdffdc";
// 	} else {
// 		return "white";
// 	}
// };
//
// let newNodes = [];
// let links = [];
// let width = 900;
// let height = 900;
// let svg = d3.create("svg").attr("width", width).attr("height", height);

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

// redraw(randomData());
//
// d3.interval(function(){
// 	redraw(randomData());
// }, 1000);
//
// function redraw(data){
//
// 	// update the y scale
// 	y.domain([0, jz.arr.max(data.map(function(d){ return d.sum }))]);
//
// 	svg.select(".y")
// 		.transition()
// 		.call(customYAxis);
//
// 	// each data column (a.k.a "key" or "series") needs to be iterated over
// 	// the variable alphabet represents the unique keys of the stacks
// 	alphabet.forEach(function(key, key_index){
//
// 		var bar = svg.selectAll(".bar-" + key)
// 			.data(stack(data)[key_index], function(d){ return d.data[x_var] + "-" + key; });
//
// 		bar
// 			.transition()
// 			.attr("x", function(d){ return x(d.data[x_var]); })
// 			.attr("y", function(d){ return y(d[1]); })
// 			.attr("height", function(d){ return y(d[0]) - y(d[1]); });
//
// 		bar.enter().append("rect")
// 			.attr("class", function(d){ return "bar bar-" + key; })
// 			.attr("x", function(d){ return x(d.data[x_var]); })
// 			.attr("y", function(d){ return y(d[1]); })
// 			.attr("height", function(d){ return y(d[0]) - y(d[1]); })
// 			.attr("width", x.bandwidth())
// 			.attr("fill", function(d){ return color(key); })
//
// 	});
//
// }

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
