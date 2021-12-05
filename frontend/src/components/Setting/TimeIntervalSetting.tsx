import {
	Granularity,
	selectTimeInterval,
	setEndTime,
	setStartTime,
	setStep,
	TimeIntervalState
} from "../../states/timeIntervalSlice";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import React, { useEffect, useRef, useState } from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/lab";

export function TimeIntervalSetting() {
	const timeIntervalState: TimeIntervalState = useAppSelector(selectTimeInterval);
	const interval = timeIntervalState.interval;
	const stepLenRef = useRef<HTMLInputElement>();
	const [stepGranularity, setStepGranularity] = useState<Granularity>(interval.step.granularity);
	const dispatch = useAppDispatch();

	const handleStepChange = () => {
		const len = stepLenRef.current;
		if (!!len && !!stepGranularity) {
			dispatch(setStep({ length: Number(len.value), granularity: stepGranularity }));
		}
	};

	useEffect(handleStepChange, [stepGranularity, dispatch]);

	return (
		<Stack spacing={1}>
			<Typography variant="h5" mb={3}>
				Time interval
			</Typography>
			<DateTimePicker
				value={interval.start}
				label="Start"
				onChange={(value) => {
					if (value) dispatch(setStartTime(value!));
				}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
			<DateTimePicker
				value={interval.end}
				label="End"
				onChange={(value) => {
					if (value) dispatch(setEndTime(value!));
				}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
			<FormControl sx={{ m: 1 }}>
				<Stack direction="row" spacing={1}>
					<TextField
						onChange={handleStepChange}
						id="standard-number"
						type="number"
						label="Step"
						InputLabelProps={{
							shrink: true
						}}
						variant="outlined"
						value={interval.step.length}
						inputRef={stepLenRef}
					/>
					<Select
						onChange={(e: SelectChangeEvent<string>) => {
							setStepGranularity(e.target.value as Granularity);
						}}
						value={interval.step.granularity}
						autoWidth>
						{Object.values(Granularity).map((g: string) => (
							<MenuItem key={g} value={g}>
								{g}
							</MenuItem>
						))}
					</Select>
				</Stack>
			</FormControl>
		</Stack>
	);
}
