import * as d3 from "d3";

const getBarColor = (d) => {
	return "#aeccda";
};

const draw = (props) => {
	d3.select(`.${props.attribute}-histogram > *`).remove();

	const margin = { top: 10, right: 30, bottom: 30, left: 40 },
		width = 500 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;

	const xAxisMax = d3.max(props.data, (d) => +d[props.attribute]);

	const y = d3.scaleLinear().range([height, 0]);

	// X axis --> range
	const x = d3
		.scaleLinear()
		.domain([0, xAxisMax + 5])
		.range([0, width]);

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("class", "d3-tooltip")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("padding", "15px")
		.style("background", "rgba(0,0,0,0.6)")
		.style("border-radius", "5px")
		.style("color", "#fff");

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
				.attr("y", 0)
				.attr("fill", "currentColor")
				.attr("text-anchor", "start")
				.style("font", "12px sans-serif")
				.text(props.labelY)
		)
		.call((g) =>
			g
				.append("text")
				.attr("x", 426)
				.attr("y", 237)
				.attr("fill", "currentColor")
				.attr("text-anchor", "end")
				.style("font", "12px sans-serif")
				.text(props.labelX)
		);

	const histogram = d3
		.bin()
		.value(function (d) {
			return d[props.attribute];
		})
		.domain(x.domain()) // then the domain of the graphic
		.thresholds(x.ticks(10)); //number of bins

	const bins = histogram(props.data);

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
		.style("cursor", "pointer")
		.attr("fill", getBarColor())
		.on("mouseover", function (e, d) {
			d3.select(this).attr("fill", "#fdcc8b");
			tooltip.style("visibility", "visible").text(`${d.length} students`);
		})
		.on("mousemove", function (event) {
			tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px");
		})
		.on("mouseout", function () {
			d3.select(this).attr("fill", getBarColor());
			tooltip.style("visibility", "hidden");
		})
		.attr("transform", function (d) {
			return "translate(" + x(d.x0) + "," + y(d.length) + ")";
		})
		.attr("width", function (d) {
			return x(d.x1) - x(d.x0);
		})
		.attr("height", function (d) {
			return height - y(d.length);
		});

	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	svg.append("g").call(d3.axisLeft(y));
};

export default draw;
