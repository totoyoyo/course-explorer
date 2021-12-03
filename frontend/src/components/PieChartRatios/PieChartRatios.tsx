import React, { useEffect } from "react";
import { draw } from "./vis";

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
	useEffect(() => {
		if (props.nodes.length > 0) {
			draw(props.nodes, props.links);
		}
	}, [props]);

	return <div className="vis-pie-chart" style={{ paddingBottom: 25 }} />;
}
