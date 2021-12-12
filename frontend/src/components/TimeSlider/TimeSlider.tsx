import React, { useEffect, useState } from "react";
import { Slider, Stack } from "@mui/material";
import { hide_marks } from "./vis";
import { formatISO } from "date-fns";

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
		hide_marks();
	}, [props]);

	return (
		<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
			<Slider
				aria-label="Time"
				step={null}
				min={props.min}
				max={props.max}
				marks={props.marks}
				valueLabelDisplay="auto"
				value={value || props.min}
				valueLabelFormat={(number, index) => formatISO(number)}
				onChangeCommitted={(event: React.SyntheticEvent | Event, value: number | Array<number>) => {
					if (typeof value === "number") {
						props.onChange(value);
					}
				}}
			/>
		</Stack>
	);
}
