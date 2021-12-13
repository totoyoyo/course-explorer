import React, { useEffect, useRef } from "react";
import draw from "./vis";
import { StudentDetail } from "../../states/studentDetailsSlice";
import { Attribute } from "../../states/attributesSlice";
import { useResize } from "../useResize";
import { Box } from "@mui/material";

export interface HistogramWidgetProps {
	indicator: { name: string; students: Set<string> };
	outcome: { name: string; students: Set<string> };
	data: StudentDetail[];
	attribute: Attribute;
	labelX: string;
	labelY: string;
}

export default function HistogramWidget(props: HistogramWidgetProps) {
	const rootRef = useRef(null);
	const size = useResize(rootRef);

	useEffect(() => {
		if (size) {
			draw(props, size);
		}
	}, [props, size]);

	return <Box sx={{ width: "100%" }} className={`${props.attribute}-histogram-widget`} ref={rootRef} />;
}
