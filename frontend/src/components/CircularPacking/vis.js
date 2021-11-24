import * as d3 from "d3";
import { color, HierarchyCircularNode, SimulationNodeDatum } from "d3";

let width = 200;
let height = 200;

const pack = (data) =>
	d3.pack().size([width, height]).padding(3)(d3.hierarchy({ name: "dummy", children: data }).sum((d) => 1));

// Source: https://observablehq.com/@d3/zoomable-circle-packing
const draw = (props) => {
	d3.select(".vis-circular-packing > *").remove();
	let root = pack(props);
	let focus = root;
	let view;

	//Creates a general svg
	let svg = d3
		.select(".vis-circular-packing")
		.append("svg")
		.attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
		.style("display", "block")
		.style("margin", "0 -8px")
		.on("click", (event) => zoom(event, root));

	//Draws the circles
	const circle = svg
		.append("g")
		.selectAll("circle")
		.data(root.descendants().slice(1))
		.join("circle")
		.attr("fill", (d) => (d.children ? "green" : "white"))
		.attr("pointer-events", (d) => (!d.children ? "none" : null))
		.style("cursor", "pointer")
		.on("mouseover", function () {
			d3.select(this).attr("stroke", "#000");
		})
		.on("mouseout", function () {
			d3.select(this).attr("stroke", null);
		})
		.on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));
	// Draws the labels
	const label = svg
		.append("g")
		.style("font", "10px sans-serif")
		.attr("pointer-events", "none")
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.selectAll("text")
		.data(root.descendants().slice(1))
		.join("text")
		.attr("stroke", "black")
		.attr("stroke-width", "1px")
		.style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
		.style("display", (d) => (d.parent === root ? "inline" : "none"))
		.text((d) => {
			return d.data.name;
		});

	display([root.x, root.y, root.r * 2]);
	//Displays lables and circles
	function display(v) {
		const k = width / v[2];

		view = v;

		label.attr("transform", (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
		circle.attr("transform", (d) => {
			return `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`;
		});
		circle.attr("r", (d) => d.r * k);
	}
	//Zoom function
	function zoom(event, d) {
		if (d.height === 0) {
			return;
		}
		const focusOld = focus;

		focus = d;

		const transition = svg
			.transition()
			.duration(event.altKey ? 7500 : 750)
			.tween("zoom", (d) => {
				const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
				return (t) => {
					display(i(t));
				};
			});
		label
			.filter(function (d) {
				return d.parent === focus || this.style.display === "inline";
			})
			.transition(transition)
			.style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
			.on("start", function (d) {
				if (d.parent === focus) {
					return (this.style.display = "inline");
				}
			})
			.on("end", function (d) {
				if (d.parent !== focus) this.style.display = "none";
			});
	}
};

export default draw;
