import React, { useEffect } from "react";
import { draw } from "./vis";

export interface NodeGroup {
	id: string;
	name: string;
	children?: NodeGroup[];
}

export interface Link {
	source: string;
	target: string;
	value: number;
}

export interface CircularPackingProps {
	nodes: NodeGroup[];
	links: Link[];
}

export default function CircularPacking(props: CircularPackingProps) {
	useEffect(() => {
		if (props.nodes.length > 0) {
			draw(props.nodes, props.links);
		}
	}, [props]);

	return <div className="vis-circular-packing" />;
}
