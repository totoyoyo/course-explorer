import * as d3 from "d3";
import { count } from "d3";
//https://www.d3-graph-gallery.com/graph/histogram_basic.html
//https://observablehq.com/@d3/histogram

const draw = (props) => {
	d3.select(".Histogram > *").remove();

	const margin = { top: 10, right: 30, bottom: 30, left: 40 },
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	const XAxismax = d3.max(props, function (d) {
		return +d.piazzaPosts;
	});

	const y = d3.scaleLinear().range([height, 0]);

	// X axis --> range
	const x = d3
		.scaleLinear()
		.domain([0, XAxismax + 5])
		.range([0, width]);

	let svg = d3
		.select(".Histogram")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call((g) =>
			g
				.append("text")
				.attr("x", -margin.left + 45)
				.attr("y", 5)
				.attr("fill", "currentColor")
				.attr("text-anchor", "start")
				.style("font", "10px sans-serif")
				.text("Number of Students")
		)
		.call((g) =>
			g
				.append("text")
				.attr("x", 900)
				.attr("y", 487)
				.attr("fill", "currentColor")
				.attr("text-anchor", "end")
				.style("font", "10px sans-serif")
				.text("Number of Piazza posts")
		);

	const histogram = d3
		.histogram()
		.value(function (d) {
			return d.piazzaPosts;
		}) // I need to give the vector of value
		.domain(x.domain()) // then the domain of the graphic
		.thresholds(x.ticks(5)); //number of bins

	const bins = histogram(props);

	y.domain([
		0,
		d3.max(bins, function (d) {
			return d.length;
		}) + 5
	]).ticks(1);

	svg.selectAll("rect")
		.data(bins)
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("class", "bar")
		.style("cursor", "pointer")
		.on("mouseover", function () {
			d3.select(this).attr("stroke", "#000");
		})
		.on("mouseout", function () {
			d3.select(this).attr("stroke", null);
		})
		.attr("transform", function (d) {
			return "translate(" + x(d.x0) + "," + y(d.length) + ")";
		})
		.attr("width", function (d) {
			return x(d.x1) - x(d.x0) - 1;
		})
		.attr("height", function (d) {
			return height - y(d.length);
		})
		.style("fill", "blue");

	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	svg.append("g").call(d3.axisLeft(y));
};

export default draw;
