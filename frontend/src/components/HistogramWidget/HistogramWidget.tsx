import React, { useEffect } from "react";
import draw from "./vis";
import { StudentDetail } from "../../states/studentDetailsSlice";
import { Attribute } from "../../states/attributesSlice";

export interface HistogramWidgetProps {
	indicator: { name: string; students: Set<string> };
	outcome: { name: string; students: Set<string> };
	data: StudentDetail[];
	attribute: Attribute;
	labelX: string;
	labelY: string;
}

export default function HistogramWidget(props: HistogramWidgetProps) {
	useEffect(() => {
		draw(props);
	}, [props]);

	return <div className={`${props.attribute}-histogram-widget`} />;
}
