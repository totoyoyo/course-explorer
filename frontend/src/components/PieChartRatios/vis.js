import * as d3 from "d3";

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/stacked-horizontal-bar-chart
function StackedBarChart(
	data,
	{
		x = (d) => d, // given d in data, returns the (quantitative) x-value
		y = (d, i) => i, // given d in data, returns the (ordinal) y-value
		z = () => 1, // given d in data, returns the (categorical) z-value
		title, // given d in data, returns the title text
		marginTop = 30, // top margin, in pixels
		marginRight = 0, // right margin, in pixels
		marginBottom = 0, // bottom margin, in pixels
		marginLeft = 40, // left margin, in pixels
		width = 640, // outer width, in pixels
		height, // outer height, in pixels
		xType = d3.scaleLinear, // type of x-scale
		xDomain, // [xmin, xmax]
		xRange = [marginLeft, width - marginRight], // [left, right]
		yDomain, // array of y-values
		yRange, // [bottom, top]
		yPadding = 0.1, // amount of y-range to reserve to separate bars
		zDomain, // array of z-values
		offset = d3.stackOffsetDiverging, // stack offset method
		order = d3.stackOrderNone, // stack order method
		xFormat, // a format specifier string for the x-axis
		xLabel, // a label for the x-axis
		colors = d3.schemeTableau10 // array of colors
	} = {}
) {
	const bars = svg.selectAll(".bars");
	// Compute values.
	const X = d3.map(data, x);
	const Y = d3.map(data, y);
	const Z = d3.map(data, z);

	// Compute default y- and z-domains, and unique them.
	if (yDomain === undefined) yDomain = Y;
	if (zDomain === undefined) zDomain = Z;
	yDomain = new d3.InternSet(yDomain);
	zDomain = new d3.InternSet(zDomain);

	// Omit any data not present in the y- and z-domains.
	const I = d3.range(X.length).filter((i) => yDomain.has(Y[i]) && zDomain.has(Z[i]));

	// If the height is not specified, derive it from the y-domain.
	if (height === undefined) height = yDomain.size * 25 + marginTop + marginBottom;
	if (yRange === undefined) yRange = [height - marginBottom, marginTop];

	// Compute a nested array of series where each series is [[x1, x2], [x1, x2],
	// [x1, x2], …] representing the x-extent of each stacked rect. In addition,
	// each tuple has an i (index) property so that we can refer back to the
	// original data point (data[i]). This code assumes that there is only one
	// data point for a given unique y- and z-value.
	const series = d3
		.stack()
		.keys(zDomain)
		.value(([, I], z) => X[I.get(z)])
		.order(order)
		.offset(offset)(
			d3.rollup(
				I,
				([i]) => i,
				(i) => Y[i],
				(i) => Z[i]
			)
		)
		.map((s) => s.map((d) => Object.assign(d, { i: d.data[1].get(s.key) })));

	// Compute the default y-domain. Note: diverging stacks can be negative.
	if (xDomain === undefined) xDomain = d3.extent(series.flat(2));

	// Construct scales, axes, and formats.
	const xScale = xType(xDomain, xRange);
	const yScale = d3.scaleBand(yDomain, yRange).paddingInner(yPadding);
	const color = d3.scaleOrdinal(zDomain, colors);
	const xAxis = d3.axisTop(xScale).ticks(width / 80, xFormat);
	const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

	// Compute titles.
	if (title === undefined) {
		const formatValue = xScale.tickFormat(100, xFormat);
		title = (i) => `${Y[i]}\n${Z[i]}\n${formatValue(X[i])}`;
	} else {
		const O = d3.map(data, (d) => d);
		const T = title;
		title = (i) => T(O[i], i, data);
	}

	svg.append("g")
		.attr("class", "bars")
		.attr("transform", `translate(0,${marginTop})`)
		.call(xAxis)
		.call((g) => g.select(".domain").remove())
		.call((g) =>
			g
				.attr("class", "bars")
				.selectAll(".tick line")
				.clone()
				.attr("y2", height - marginTop - marginBottom)
				.attr("stroke-opacity", 0.1)
		)
		.call((g) =>
			g
				.append("text")
				.attr("class", "bars")
				.attr("x", width - marginRight)
				.attr("y", -22)
				.attr("fill", "currentColor")
				.attr("text-anchor", "end")
				.text(xLabel)
		);

	const bar = svg
		.append("g")
		.attr("class", "bars")
		.selectAll("g")
		.data(series)
		.join("g")
		.attr("fill", ([{ i }]) => color(Z[i]))
		.selectAll("rect")
		.data((d) => d)
		.join("rect")
		.attr("x", ([x1, x2]) => Math.min(xScale(x1), xScale(x2)))
		.attr("y", ({ i }) => yScale(Y[i]))
		.attr("width", ([x1, x2]) => Math.abs(xScale(x1) - xScale(x2)))
		.attr("height", yScale.bandwidth());

	if (title) bar.append("title").text(({ i }) => title(i));

	svg.append("g")
		.attr("transform", `translate(${xScale(0)},0)`)
		.attr("class", "bars")
		.call(yAxis);

	return Object.assign(svg.node(), { scales: { color } });
}

const pack = (data) =>
	d3
		.pack()
		.size([width, height])
		.padding(5)
		.radius((d) => 10)(data);

// recursively sets child pack x and y positions relative to its parent
const setPackXY = (n, prevX, prevY, prevPX, prevPY) => {
	n.pack_x = n.x - prevX + prevPX;
	n.pack_y = n.y - prevY + prevPY;
	if (n.children) {
		n.children.forEach((d) => {
			setPackXY(d, n.x, n.y, n.pack_x, n.pack_y);
		});
	}
};

const getStroke = (d) => {
	if (d.depth === 1) {
		return "black";
	}
};

const getColor = (d) => {
	if (d.depth === 3) {
		return d.parent.data.name === "true" ? "#ffbde0" : "#bdffdc";
	} else {
		return "white";
	}
};

let newNodes = [];
let links = [];
let width = 900;
let height = 900;
let svg = d3.create("svg").attr("width", width).attr("height", height);
let link = svg.append("g").attr("class", "links").attr("stroke-width", 1.5).attr("stroke", "black").selectAll("line");
let node = svg.append("g").attr("class", "nodes").selectAll("circle");
let label = svg.append("g").attr("class", "labels").selectAll("text");
let simulation = d3
	.forceSimulation(newNodes)
	.velocityDecay(0.9)
	.force(
		"link",
		d3
			.forceLink(links)
			.id((d) => d.data.id)
			.distance((d) => 100 + (1 - d.value) * 300)
	)
	.force("charge", d3.forceManyBody().strength(-200))
	.force(
		"collide",
		d3.forceCollide().radius((d) => d.r)
	)
	.alphaTarget(1);

// Source: https://observablehq.com/@d3/zoomable-circle-packing
export const draw = (groups, newLinks) => {
	d3.select(".vis-pie-chart").append(() => svg.node());
	const root = pack(d3.hierarchy({ name: "root", children: groups }).sum((d) => 1));
	root.children.forEach((d) => {
		d.pack_x = d.r;
		d.pack_y = d.r;
		setPackXY(d, d.x, d.y, d.pack_x, d.pack_y);
	});
	newNodes = root.descendants().slice(1);
	newNodes.forEach((d) => {
		if (d.data.id === "Outcome") {
			d.fx = width / 2;
			d.fy = height / 2;
		}
	});
	node = node.data(newNodes, (d) => d.data.id);
	node.exit().transition().attr("opacity", 0).remove();
	node.transition()
		.attr("stroke", getStroke)
		.attr("fill", getColor)
		.attr("cx", (d) => d.pack_x)
		.attr("cy", (d) => d.pack_y)
		.attr("r", (d) => d.r);
	node = node
		.enter()
		.append("circle")
		.attr("cx", (d) => d.pack_x)
		.attr("cy", (d) => d.pack_y)
		.attr("r", (d) => d.r)
		.attr("stroke", getStroke)
		.attr("fill", getColor)
		.transition()
		.attr("opacity", 1)
		.selection()
		.merge(node);
	links = newLinks.map((l) => Object.assign({}, l));
	link = link.data(links, (d) => `${d.source}-${d.target}`);
	link.exit()
		.transition()
		.attr("stroke-opacity", 0)
		.attrTween("x1", (d) => () => d.source.x)
		.attrTween("x2", (d) => () => d.target.x)
		.attrTween("y1", (d) => () => d.source.y)
		.attrTween("y2", (d) => () => d.target.y)
		.remove();
	link = link
		.enter()
		.append("line")
		.call((link) => link.transition().attr("stroke-opacity", 1))
		.merge(link);

	label = label.data(newNodes, (d) => d.data.id);
	label.exit().remove();
	label = label
		.enter()
		.append("text")
		.style("display", (d) => (d.depth === 1 ? "inline" : "none"))
		.text((d) => d.data.name)
		.merge(label);
	groups = groups.flatMap((g) => [
		{ ...g, s: "tp", v: g.truePositives },
		{ ...g, s: "fp", v: g.falsePositives },
		{ ...g, s: "tn", v: g.trueNegatives },
		{ ...g, s: "fn", v: g.falseNegatives }
	]);

	StackedBarChart(groups, {
		x: (d) => d.v,
		y: (d) => d.name,
		z: (d) => d.s,
		xLabel: "Population (millions) →"
	});

	console.log(groups);
	simulation.nodes(newNodes);
	simulation.force("link").links(links);
	simulation.on("tick", ticked);
	simulation.alpha(1).restart();

	function ticked() {
		// if top level node, translate based on force simulated x and y positions.
		// children of a top level node should all base their translations on it.
		const translateNode = (d) => {
			if (d.depth === 1) {
				return `translate(${d.x - d.r}, ${d.y - d.r})`;
			} else if (d.depth > 1) {
				const parents = d.ancestors();
				const p = parents[parents.length - 2];
				return `translate(${p.x - p.r}, ${p.y - p.r})`;
			}
		};

		node.attr("transform", (d) => {
			return translateNode(d);
		});
		label.attr("transform", (d) => {
			return translateNode(d);
		});
		link.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y);
	}
};
