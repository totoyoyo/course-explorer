import React, { useState, useEffect } from "react";
import { draw } from "./vis";

export interface NodeDatum {
	id: string;
	name: string;
	value: number;
}

export interface NodeGroup {
	id: string;
	name: string;
	children: NodeGroup[] | NodeDatum[];
}

export interface CircularPackingProps {
	nodes: NodeGroup[];
}

const DATA = [
	{
		id: "outcome",
		name: "outcome",
		children: [
			{
				id: "outcome-true",
				name: "true",
				children: [
					{ id: "outcome-true-student1", name: "student1", value: 1 },
					{ id: "outcome-true-student2", name: "student2", value: 1 },
					{ id: "outcome-true-student3", name: "student3", value: 1 },
					{ id: "outcome-true-student4", name: "student4", value: 1 },
					{ id: "outcome-true-student5", name: "student5", value: 1 }
				]
			}
		]
	},
	{
		id: "indicator1",
		name: "indicator1",
		children: [
			{
				id: "indicator1-true",
				name: "true",
				children: [
					{ id: "indicator1-true-student1", name: "student1", value: 1 },
					{ id: "indicator1-true-student2", name: "student2", value: 1 },
					{ id: "indicator1-true-student3", name: "student3", value: 1 },
					{ id: "indicator1-true-student4", name: "student4", value: 1 }
				]
			},
			{
				id: "indicator1-false",
				name: "false",
				children: [
					{ id: "indicator1-false-student5", name: "student5", value: 1 },
					{ id: "indicator1-false-student6", name: "student6", value: 1 },
					{ id: "indicator1-false-student7", name: "student7", value: 1 }
				]
			}
		]
	},
	{
		id: "indicator2",
		name: "indicator2",
		children: [
			{
				id: "indicator2-true",
				name: "true",
				children: [
					{ id: "indicator2-true-student1", name: "student1", value: 1 },
					{ id: "indicator2-true-student3", name: "student3", value: 1 }
				]
			}
		]
	},
	{
		id: "indicator3",
		name: "indicator3",
		children: [
			{
				id: "indicator3-true",
				name: "true",
				children: [
					{ id: "indicator3-true-student1", name: "student1", value: 1 },
					{ id: "indicator3-true-student3", name: "student3", value: 1 }
				]
			},
			{
				id: "indicator3-false",
				name: "false",
				children: [{ id: "indicator3-false-student5", name: "student5", value: 1 }]
			}
		]
	}
];

const links = [
	{ source: "outcome", target: "Indicator 1", value: 1.5 },
	{ source: "outcome", target: "Indicator 2", value: 3 },
	{ source: "outcome", target: "Indicator 3", value: 2 }
];

export default function CircularPacking(props: CircularPackingProps) {
	useEffect(() => {
		if (props.nodes.length > 0) {
			draw(props.nodes, links);
		}
	}, [props]);

	return <div className="vis-circular-packing" />;
}
