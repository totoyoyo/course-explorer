import React, { useState, useEffect } from "react";
import draw from "./VisHistogram";

export interface Students {
	name: string;
	officeHours: number;
	piazzaPosts: number;
	numberOfCommits: number;
}

export interface HistogramProps {
	data: Students[];
	attribute: string;
	lableX: string;
	lableY: string;
}

export default function Histogram(props: HistogramProps) {
	useEffect(() => {
		draw(props);
	}, [props]);

	const className = `${props.attribute}-histogram`;
	return <div className={className} />;
}
