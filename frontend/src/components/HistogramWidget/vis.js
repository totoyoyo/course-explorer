import * as d3 from "d3";

const margin = { top: 10, right: 30, bottom: 30, left: 40 },
	width = 360 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

const draw = (props) => {
	d3.select(`.${props.attribute}-histogram-widget > *`).remove();

	const svg = d3
		.select(`.${props.attribute}-histogram-widget`)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`)
		.call((g) =>
			g
				.append("text")
				.attr("x", -margin.left + 45)
				.attr("y", 5)
				.attr("fill", "currentColor")
				.attr("text-anchor", "start")
				.style("font", "10px sans-serif")
				.text(props.labelY)
		)
		.call((g) =>
			g
				.append("text")
				.attr("x", 280)
				.attr("y", 290)
				.attr("fill", "currentColor")
				.attr("text-anchor", "end")
				.style("font", "10px sans-serif")
				.text(props.labelX)
		);
	const xAxisMax = d3.max(props.data, (d) => {
		return +d[props.attribute];
	});
	const x = d3
		.scaleLinear()
		.domain([0, xAxisMax + 5])
		.range([0, width]);
	svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

	const histogram = d3
		.bin()
		.value((d) => d[props.attribute])
		.domain(x.domain())
		.thresholds(x.ticks(10));

	const binsIndicator = histogram(props.data.filter((d) => props.indicator.students.has(d.id)));
	const binsOutcome = histogram(props.data.filter((d) => props.outcome.students.has(d.id)));

	const y = d3.scaleLinear().range([height, 0]);
	y.domain([
		0,
		d3.max([...binsOutcome, ...binsIndicator], function (d) {
			return d.length;
		}) + 1
	]).ticks(1);
	svg.append("g").call(d3.axisLeft(y));

	svg.selectAll("rect-indicator")
		.data(binsIndicator)
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("transform", function (d) {
			return "translate(" + x(d.x0) + "," + y(d.length) + ")";
		})
		.attr("width", function (d) {
			return x(d.x1) - x(d.x0);
		})
		.attr("height", function (d) {
			return height - y(d.length);
		})
		.style("fill", "#69b3a2")
		.style("opacity", 0.6);

	svg.selectAll("rect-outcome")
		.data(binsOutcome)
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("transform", function (d) {
			return "translate(" + x(d.x0) + "," + y(d.length) + ")";
		})
		.attr("width", function (d) {
			return x(d.x1) - x(d.x0);
		})
		.attr("height", function (d) {
			return height - y(d.length);
		})
		.style("fill", "#404080")
		.style("opacity", 0.6);
};

export default draw;
