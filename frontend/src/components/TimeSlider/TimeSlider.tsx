import React, { useEffect, useState } from "react";
import { Slider, Stack, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/lab";

interface TimeSliderProps {
	onChange: (date: number) => void;
	value: number | undefined;
	min: number;
	max: number;
	marks: { value: number; label: string }[];
}

export function TimeSlider(props: TimeSliderProps) {
	const [value, setValue] = useState<number | undefined>(undefined);
	useEffect(() => {
		setValue(props.value);
	}, [props]);

	return (
		<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
			<DateTimePicker
				value={props.min}
				label="Start"
				readOnly
				disableOpenPicker
				onChange={() => {}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
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
			<DateTimePicker
				value={props.max}
				label="End Time"
				readOnly
				disableOpenPicker
				onChange={() => {}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
		</Stack>
	);
}
