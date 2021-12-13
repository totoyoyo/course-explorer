import React, { useEffect, useRef } from "react";
import { draw } from "./vis";
import { Box } from "@mui/material";
import { useResize } from "../useResize";

export interface RatioGroup {
	id: string;
	name: string;
	truePositives: number;
	falsePositives: number;
	trueNegatives: number;
	falseNegatives: number;
}

export interface Link {
	source: string;
	target: string;
	value: number;
}

export interface RatioProps {
	nodes: RatioGroup[];
	links: Link[];
}

export default function PieChartRatios(props: RatioProps) {
	const rootRef = useRef(null);
	const size = useResize(rootRef);

	useEffect(() => {
		if (props.nodes.length > 0 && size) {
			draw(props.nodes, size);
		}
	}, [props, size]);

	return <Box sx={{ flexBasis: "25%" }} ref={rootRef} className="vis-pie-chart" />;
}
