import React, { useEffect } from "react";
import draw from "./vis";
import { StudentDetail } from "../../states/studentDetailsSlice";

export interface HistogramProps {
	data: StudentDetail[];
	attribute: string;
	labelX: string;
	labelY: string;
}

export default function Histogram(props: HistogramProps) {
	useEffect(() => {
		draw(props);
	}, [props]);

	return <div className={`${props.attribute}-histogram`} />;
}
