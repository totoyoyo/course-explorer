import React, { useEffect, useState } from "react";
import { Slider, Stack, useTheme } from "@mui/material";

interface TimeSliderProps extends SliderConfig {
	onChange: (date: number) => void;
	value: number | undefined;
}

export interface SliderConfig {
	min: number;
	max: number;
	marks: { value: number; label: string }[];
}

export function TimeSlider(props: TimeSliderProps) {
	const [value, setValue] = useState<number | undefined>(undefined);
	useEffect(() => {
		setValue(props.value);
	}, [props]);
	const theme = useTheme();

	return (
		<Stack direction="row" spacing={2} sx={{ alignItems: "center", padding: theme.spacing(2) }}>
			<Slider
				aria-label="Time"
				step={null}
				min={props.min}
				max={props.max}
				marks={props.marks}
				value={value || props.min}
				onChangeCommitted={(event: React.SyntheticEvent | Event, value: number | Array<number>) => {
					if (typeof value === "number") {
						props.onChange(value);
					}
				}}
			/>
		</Stack>
	);
}
