import React, { useEffect } from "react";
import CircularPacking, { CircularPackingProps } from "../CircularPacking/CircularPacking";
import PieChartRatios, { RatioProps } from "../PieChartRatios/PieChartRatios";

export interface VisSwitcherProps {
	circularPacking: CircularPackingProps;
	ratioChart: RatioProps;
	selectedVis: "circularPacking" | "pieCharts";
}

export default function VizSwitcher(props: VisSwitcherProps) {
	switch (props.selectedVis) {
		case "circularPacking":
			return <CircularPacking {...props.circularPacking} />;
		case "pieCharts":
			return <PieChartRatios {...props.ratioChart} />;
	}
}
