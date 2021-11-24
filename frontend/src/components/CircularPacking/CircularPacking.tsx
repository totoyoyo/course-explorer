import React, { useState, useEffect } from "react";
import draw from "./vis";

export interface NodeDatum {
	name: string;
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
		children: [{ name: "student1" }, { name: "student2" }]
	},
	{
		name: "indicator2",
		children: [
			{ name: "student3" },
			{ name: "student4" },
			{ name: "student5" },
			{ name: "student6" },
			{ name: "student7" }
		]
	},
	{
		name: "indicator3",
		children: [{ name: "student8" }, { name: "student9" }, { name: "student10" }]
	}
];
export default function CircularPacking(props: CircularPackingProps) {
	const [data, setData] = useState<NodeGroup[]>(DATA);

	useEffect(() => {
		draw(data);
	}, [data]);

	return <div className="vis-circular-packing" />;
}
