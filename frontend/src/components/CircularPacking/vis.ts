import * as d3 from "d3";
import { SimulationNodeDatum } from "d3";

export interface NodeDatum extends SimulationNodeDatum {
	text: string;
}

export interface NodeGroup {
	name: string;
	children: NodeDatum[];
}

let width = 450;
let height = 450;

const draw = (props: NodeGroup[]) => {
	d3.select(".vis-circular-packing > *").remove();
	let svg = d3.select(".vis-circular-packing").append("svg").attr("width", 450).attr("height", 450);

	// TODO: draw each node group as separate circle packing placed
};

export default draw;
