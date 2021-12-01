import * as d3 from "d3";
//https://www.d3-graph-gallery.com/graph/histogram_basic.html
//https://observablehq.com/@d3/histogram

const draw = (props) => {
	d3.select(`.${props.attribute}-histogram > *`).remove();

	const margin = { top: 10, right: 30, bottom: 30, left: 40 },
		width = 500 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;

	const XAxismax = d3.max(props.data, function (d) {
		return +d[props.attribute];
	});

	const y = d3.scaleLinear().range([height, 0]);

	// X axis --> range
	const x = d3
		.scaleLinear()
		.domain([0, XAxismax + 5])
		.range([0, width]);

	let svg = d3
		.select(`.${props.attribute}-histogram`)
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
				.text(props.lableY)
		)
		.call((g) =>
			g
				.append("text")
				.attr("x", 426)
				.attr("y", 237)
				.attr("fill", "currentColor")
				.attr("text-anchor", "end")
				.style("font", "10px sans-serif")
				.text(props.lableX)
		);

	const histogram = d3
		.histogram()
		.value(function (d) {
			return d[props.attribute];
		})
		.domain(x.domain()) // then the domain of the graphic
		.thresholds(x.ticks(6)); //number of bins

	const bins = histogram(props.data);

	y.domain([
		0,
		d3.max(bins, function (d) {
			return d.length;
		}) + 5
	]).ticks(1);

	const hoverLable = svg
		.append("text")
		.attr("id", "hoverLable")
		.attr("x", width - 250)
		.attr("y", 5)
		.text("Number of Students: ");

	svg.selectAll("rect")
		.data(bins)
		.enter()
		.append("rect")
		.attr("x", 0)
		.style("cursor", "pointer")
		.on("mouseover", function (d, i) {
			d3.select(this).attr("stroke", "#000");
			d3.select("#hoverLable").text(`Number of Students: ${i.length}`);
		})
		.on("mouseout", function (d, i) {
			d3.select(this).attr("stroke", null);
			d3.select("#hoverLable").text(`Number of Students: ${0}`);
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
