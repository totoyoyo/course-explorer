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
import { Dataset, selectDatasets } from "../../states/datasetSlice";

export function TimeIntervalSetting() {
	const timeIntervalState: TimeIntervalState = useAppSelector(selectTimeInterval);
	const selectedDataset: Dataset | undefined = useAppSelector(selectDatasets).selected;
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

	const isDisabled = () => selectedDataset === undefined;

	useEffect(handleStepChange, [stepGranularity, dispatch]);

	return (
		<Stack spacing={1}>
			<Typography variant="h5" mb={3}>
				Time interval
			</Typography>
			<DateTimePicker
				disabled={isDisabled()}
				minDate={interval.start}
				maxDate={interval.end}
				value={interval.start}
				label="Start"
				onChange={(value) => {
					if (value) dispatch(setStartTime(value!));
				}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
			<DateTimePicker
				disabled={isDisabled()}
				minDate={interval.start}
				maxDate={interval.end}
				value={interval.end}
				label="End"
				onChange={(value) => {
					if (value) dispatch(setEndTime(value!));
				}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
			<FormControl sx={{ m: 1 }} disabled={isDisabled()}>
				<Stack direction="row" spacing={1}>
					<TextField
						disabled={isDisabled()}
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
						inputProps={{ min: 1 }}
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
