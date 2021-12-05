import { Dataset, selectDatasets, setSelected } from "../../states/datasetSlice";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";

export function DatasetSetting() {
	const datasets: Dataset[] = useAppSelector(selectDatasets).datasets;
	const selected: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const dispatch = useAppDispatch();

	const handleChange = (event: SelectChangeEvent) => {
		dispatch(setSelected(event.target.value));
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
