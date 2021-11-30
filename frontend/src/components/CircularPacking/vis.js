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

let selection_links = svg
	.append("g")
	.attr("class", "selection_links")
	.attr("stroke-width", 1)
	.attr("stroke", "orange")
	.selectAll("line");

let get_ancestor_post = (data) => {
	const parents = data.ancestors();
	const p = parents[parents.length - 2];
	return [p.x - p.r, p.y - p.r];
};

let get_links_between_nodes = (nodes) => {
	return nodes.map((item, index) => ({ source: item, target: nodes[(index + 1) % nodes.length] }));
};

export const select = (groups, newLinks) => {
	const svg_selection = node;
	svg_selection.on("mouseover", mouseover);
	svg_selection.on("mouseout", mouseout);

	function mouseover(event, node) {
		console.log("this is event", event);
		console.log("this is node", node);
		console.log("this is node data", node.data);
		const current_name = node.data.name;
		if (current_name.includes("student")) {
			const current = d3.selectAll("circle").filter((d) => d.data.name.includes(current_name));
			let curr_data = current.data();
			let linkNodes = get_links_between_nodes(curr_data);
			// current.each((d, index) => (linkNodes[index] = d));
			var transforms = current.attr("transform");
			console.log("this selection", current);
			console.log("this linkNodes", linkNodes);
			let newLines = selection_links
				.data(linkNodes)
				.enter()
				.append("line")
				.attr("x1", (d) => get_ancestor_post(d.source)[0] + d.source.pack_x)
				.attr("y1", (d) => get_ancestor_post(d.source)[1] + d.source.pack_y)
				.attr("x2", (d) => get_ancestor_post(d.target)[0] + d.target.pack_x)
				.attr("y2", (d) => get_ancestor_post(d.target)[1] + d.target.pack_y);
			current.transition().duration(500).style("fill", "orange").attr("r", 20);
		}
	}
	function mouseout(event, node) {
		const current_name = node.data.name;
		if (current_name.includes("student")) {
			const current = d3.selectAll("circle").filter((d) => d.data.name.includes(current_name));
			current.transition().duration(500).attr("r", 10).style("fill", getColor);
			const selection = d3.select(".selection_links").selectAll("line").remove();
			selection.remove();
		}
	}
};

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
	console.log("current links", links);
	link = link.data(links, (d) => `${d.source}-${d.target}`);
	console.log("data link", link);
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
	console.log("here's the links", link);

	label = label.data(newNodes, (d) => d.data.id);
	label.exit().remove();
	label = label
		.enter()
		.append("text")
		.style("display", (d) => (d.depth === 1 ? "inline" : "none"))
		.text((d) => d.data.name)
		.merge(label);

	// node.on("click", function (e, d) {
	// 	console.log(e, "dam", d);
	// 	d3.select(this).style("fill", "orange");
	// });

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
