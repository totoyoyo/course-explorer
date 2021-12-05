import { Dataset, selectDatasets, setSelected } from "../../states/datasetSlice";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { setEndTime, setStartTime } from "../../states/timeIntervalSlice";
import React from "react";
import { toDate } from "date-fns";

export function DatasetSetting() {
	const datasets: Dataset[] = useAppSelector(selectDatasets).datasets;
	const selected: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const dispatch = useAppDispatch();

	const handleChange = (event: SelectChangeEvent) => {
		const selected = datasets.find((d) => d.id === event.target.value);
		if (selected) {
			dispatch(setSelected(selected));
			dispatch(setStartTime(toDate(selected.start)));
			dispatch(setEndTime(toDate(selected.end)));
		}
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<Typography variant="h5" mb={3}>
				Dataset
			</Typography>
			<FormControl fullWidth>
				<InputLabel id="datasets-select">Select dataset</InputLabel>
				<Select
					labelId="datasets-select"
					id="datasets-select"
					value={selected?.id}
					label="Dataset"
					onChange={handleChange}>
					{datasets.map((d: Dataset) => {
						return <MenuItem value={d.id}>{d.name}</MenuItem>;
					})}
				</Select>
			</FormControl>
		</Box>
	);
}
