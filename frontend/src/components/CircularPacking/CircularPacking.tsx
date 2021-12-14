import React, { useEffect, useRef } from "react";
import { draw } from "./vis";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useResize } from "../useResize";

export interface NodeGroup {
	id: string;
	name: string;
	children?: NodeGroup[];
}

export interface Link {
	source: string;
	target: string;
	value: number;
}

export interface CircularPackingProps {
	nodes: NodeGroup[];
	links: Link[];
	onSelectIndicator: (i: string) => void;
}

export function CircularPacking(props: CircularPackingProps) {
	const rootRef = useRef(null);
	const size = useResize(rootRef);

	useEffect(() => {
		if (props.nodes.length > 0 && size) {
			draw(props.nodes, props.links, props.onSelectIndicator, size);
		}
	}, [props, size]);

	return <Box sx={{ flexBasis: "75%" }} ref={rootRef} className="vis-circular-packing" />;
}

export function CircularPackingLegend(props: CircularPackingProps) {
	const theme = useTheme();
	return (
		<Box sx={{ flexBasis: "10%", padding: theme.spacing(0, 1) }}>
			<Typography variant={"h5"}>F-Score</Typography>
			<Divider />
			<Stack spacing={theme.spacing(1)} sx={{ margin: theme.spacing(1, 0) }}>
				{props.links.map((link, i) => (
					<Typography variant={"subtitle1"} key={i}>{`${link.target}: ${link.value.toFixed(3)}`}</Typography>
				))}
			</Stack>
		</Box>
	);
}
