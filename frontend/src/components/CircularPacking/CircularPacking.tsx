import React, { useState, useEffect } from "react";
import draw from "./vis";

export interface NodeDatum {
	text: string;
}

export interface NodeGroup {
	name: string;
	children: NodeDatum[];
}

export interface CircularPackingProps {
	data: NodeGroup[];
}

const DATA = [
	{
		name: "indicator1",
		children: [{ text: "student1" }, { text: "student2" }]
	},
	{
		name: "indicator2",
		children: [
			{ text: "student3" },
			{ text: "student4" },
			{ text: "student5" },
			{ text: "student6" },
			{ text: "student7" }
		]
	},
	{
		name: "indicator3",
		children: [{ text: "student8" }, { text: "student9" }, { text: "student10" }]
	}
];
export default function CircularPacking(props: CircularPackingProps) {
	const [data, setData] = useState<NodeGroup[]>(DATA);

	useEffect(() => {
		draw(data);
	}, [data]);

	return <div className="vis-circular-packing" />;
}
