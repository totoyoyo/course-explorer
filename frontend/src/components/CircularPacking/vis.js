import * as d3 from "d3";

const pack = (data) =>
	d3
		.pack()
		.size([width, height])
		.padding(5)
		.radius((d) => 10)(data);

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
let simulation = d3
	.forceSimulation(newNodes)
	.velocityDecay(0.8)
	.force(
		"link",
		d3
			.forceLink(links)
			.id((d) => d.data.id)
			.distance((d) => d.value * 100)
	)
	.force("x", d3.forceX().x(width * 0.5))
	.force("y", d3.forceY().y(height * 0.5))
	.force("charge", d3.forceManyBody().strength(-100))
	.force(
		"collide",
		d3.forceCollide().radius((d) => d.r)
	)
	.alphaTarget(1);

export const draw = (groups, newLinks) => {
	d3.select(".vis-circular-packing").append(() => svg.node());
	const root = pack(d3.hierarchy({ name: "root", children: groups }).sum((d) => 1));
	const old = new Map(node.data().map((d) => [d.data.id, d]));
	root.children.forEach((d) => {
		d.pack_x = d.r;
		d.pack_y = d.r;
		setPackXY(d, d.x, d.y, d.pack_x, d.pack_y);
	});
	newNodes = root.descendants().slice(1);
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
	simulation.nodes(newNodes);
	simulation.force("link").links(links);
	simulation.on("tick", ticked);
	simulation.alpha(1).restart();
};

function ticked() {
	node.attr("transform", (d) => {
		if (d.depth === 1) {
			return `translate(${d.x - d.r}, ${d.y - d.r})`;
		} else if (d.depth > 1) {
			const parents = d.ancestors();
			const p = parents[parents.length - 2];
			return `translate(${p.x - p.r}, ${p.y - p.r})`;
		}
	});
	link.attr("x1", (d) => d.source.x)
		.attr("y1", (d) => d.source.y)
		.attr("x2", (d) => d.target.x)
		.attr("y2", (d) => d.target.y);
}
