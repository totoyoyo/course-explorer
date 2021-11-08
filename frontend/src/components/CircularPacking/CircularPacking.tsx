import React, { useState, useEffect } from "react";
import draw, { NodeGroup } from "./vis";

export interface CircularPackingProps {
	data: NodeGroup[];
}

export default function CircularPacking(props: CircularPackingProps) {
	const [data, setData] = useState<NodeGroup[]>(props.data);

	useEffect(() => {
		draw(data);
	}, [data]);

	return <div className="vis-circular-packing" />;
}
