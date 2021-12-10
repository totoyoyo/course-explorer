import * as d3 from "d3";

const pack = (data) =>
	d3
		.pack()
		.size([width, height])
		.padding(5)
		.radius((d) => 10)(data);

const isTopLevel = (d) => d.depth === 1;
const isLeaf = (d) => d.children === undefined;
const isInternal = (d) => d.depth > 1 && !isLeaf(d);

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

const getNodeStroke = (d) => {
	if (isTopLevel(d)) {
		return "black";
	}
};

const getNodeColor = (d) => {
	if (isLeaf(d)) {
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
let zoomListenerRet = svg
	.append("rect")
	.attr("class", "zoom-listener-rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", width)
	.attr("height", height)
	.style("opacity", 0);
let link = svg.append("g").attr("class", "links").attr("stroke", "black").selectAll("line");
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
const zoom = d3.zoom().scaleExtent([1, 8]);
let transform = d3.zoomIdentity;
let selected = undefined;

// Source: https://observablehq.com/@d3/zoomable-circle-packing
export const draw = (groups, newLinks, onSelectIndicator) => {
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
		.attr("stroke", getNodeStroke)
		.attr("stroke-width", 1)
		.attr("fill", getNodeColor)
		.attr("r", (d) => Math.max(d.r, d.r * transform.k))
		.attr("cx", (d) => Math.max(d.pack_x, d.pack_x * transform.k))
		.attr("cy", (d) => Math.max(d.pack_y, d.pack_y * transform.k));
	node = node
		.enter()
		.append("circle")
		.attr("r", (d) => Math.max(d.r, d.r * transform.k))
		.attr("cx", (d) => Math.max(d.pack_x, d.pack_x * transform.k))
		.attr("cy", (d) => Math.max(d.pack_y, d.pack_y * transform.k))
		.attr("stroke", getNodeStroke)
		.attr("stroke-width", 1)
		.attr("fill", getNodeColor)
		.attr("opacity", 1)
		.attr("cursor", "pointer")
		.selection()
		.merge(node);
	node.on("click", function (event, d) {
		if (isTopLevel(d) && selected !== d) {
			selected = d;
			d3.select(this).attr("stroke-width", 3);
			onSelectIndicator(d.data.name);
		} else if (isInternal(d) && selected !== d.parent) {
			selected = d.parent;
			d3.select(this.parentNode).attr("stroke-width", 3);
			onSelectIndicator(d.parent.data.name);
		} else if (isTopLevel(d)) {
			selected = undefined;
			d3.select(this).attr("stroke-width", 1);
			onSelectIndicator(selected);
		} else {
			selected = undefined;
			d3.select(this.parentNode).attr("stroke-width", 1);
			onSelectIndicator(selected);
		}
		event.stopPropagation();
	});

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
		.attr("transform", transform.toString())
		.attr("stroke-width", 1.5 / transform.k)
		.call((link) => link.transition().attr("stroke-opacity", 1))
		.merge(link);

	label = label.data(newNodes, (d) => d.data.id);
	label.exit().remove();

	const setOpacityScale = (d) => {
		const area = Math.PI * Math.pow(d.r, 2);
		d.scaleThreshold = Math.sqrt(1000 / area);
		d.opacityScale = d3
			.scaleLinear()
			.domain([d.scaleThreshold, d.scaleThreshold * 1.3])
			.range([0, 1]);
	};
	label.each(setOpacityScale);
	label = label
		.enter()
		.append("text")
		.each(setOpacityScale)
		.attr("display", (d) => (isInternal(d) ? "none" : "inline"))
		.attr("opacity", (d) => (transform.k > d.scaleThreshold ? d.opacityScale(transform.k) : 0))
		.attr("x", (d) => Math.max(d.pack_x, d.pack_x * transform.k))
		.attr("y", (d) => (isTopLevel(d) ? -5 : Math.max(d.pack_y, d.pack_y * transform.k)))
		.attr("text-anchor", "middle")
		.text((d) => d.data.name)
		.merge(label);

	simulation.nodes(newNodes);
	simulation.force("link").links(links);
	simulation.on("tick", ticked);
	simulation.alpha(1).restart();

	zoom.on("zoom", zoomed);
	zoomListenerRet.call(zoom);

	function ticked() {
		// if top level node, translate based on force simulated x and y positions.
		// children of a top level node should all base their translations on it.
		const translateNode = (d) => {
			let dx, dy;
			if (d.depth === 1) {
				dx = d.x - d.r;
				dy = d.y - d.r;
			} else if (d.depth > 1) {
				const parents = d.ancestors();
				const p = parents[parents.length - 2];
				dx = p.x - p.r;
				dy = p.y - p.r;
			}
			return `translate(${transform.apply([dx, dy]).toString()})`;
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

	function zoomed(event) {
		transform = event.transform;
		node.attr("r", (d) => Math.max(d.r, d.r * transform.k))
			.attr("cx", (d) => Math.max(d.pack_x, d.pack_x * transform.k))
			.attr("cy", (d) => Math.max(d.pack_y, d.pack_y * transform.k));
		link.attr("transform", transform.toString()).attr("stroke-width", 1.5 / transform.k);
		label
			.attr("x", (d) => Math.max(d.pack_x, d.pack_x * transform.k))
			.attr("y", (d) => (isTopLevel(d) ? -5 : Math.max(d.pack_y, d.pack_y * transform.k)))
			.attr("opacity", (d) => (transform.k > d.scaleThreshold ? d.opacityScale(transform.k) : 0));
		ticked();
	}
};
