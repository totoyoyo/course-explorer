import React, { useEffect, useRef } from "react";
import { draw } from "./vis";
import { Box } from "@mui/material";
import { useResize } from "../useResize";

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
	onSelectIndicator: (i: string) => void;
}

export default function CircularPacking(props: CircularPackingProps) {
	const rootRef = useRef(null);
	const size = useResize(rootRef);

	useEffect(() => {
		if (props.nodes.length > 0 && size) {
			draw(props.nodes, props.links, props.onSelectIndicator, size);
		}
	}, [props, size]);

	return <Box sx={{ flexBasis: "80%" }} ref={rootRef} className="vis-circular-packing" />;
}
