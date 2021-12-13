import React, { useEffect, useState } from "react";
import { Box, Slider, useTheme } from "@mui/material";
import { format } from "date-fns";

interface TimeSliderProps extends SliderConfig {
	onChange: (date: number) => void;
	value: number | undefined;
}

export interface SliderConfig {
	min: number;
	max: number;
	marks: { value: number; label?: string }[];
}

export function TimeSlider(props: TimeSliderProps) {
	const [value, setValue] = useState<number | undefined>(undefined);
	useEffect(() => {
		setValue(props.value);
	}, [props]);
	const theme = useTheme();

	return (
		<Box sx={{ padding: theme.spacing(1, 10) }}>
			<Slider
				aria-label="Time"
				step={null}
				min={props.min}
				max={props.max}
				marks={props.marks}
				value={value || props.min}
				valueLabelFormat={(value) => format(value, "Pp")}
				valueLabelDisplay="auto"
				onChangeCommitted={(event: React.SyntheticEvent | Event, value: number | Array<number>) => {
					if (typeof value === "number") {
						props.onChange(value);
					}
				}}
			/>
		</Box>
	);
}
