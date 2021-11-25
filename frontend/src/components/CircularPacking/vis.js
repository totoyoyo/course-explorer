import * as d3 from "d3";

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
	d3.select(".vis-circular-packing").append(() => svg.node());
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
