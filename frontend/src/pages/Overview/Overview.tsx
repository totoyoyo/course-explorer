import Histogram from "../../components/Histogram/Histogram";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { SliderConfig, TimeSlider } from "../../components/TimeSlider/TimeSlider";
import { queryAllStudentDetails, selectStudentDetails, StudentDetail } from "../../states/studentDetailsSlice";
import { formatISO, getTime, max, milliseconds, min } from "date-fns";
import Grid from "@mui/material/Grid";
import { Dataset, selectDatasets } from "../../states/datasetSlice";
import { selectTimeInterval, TimeInterval, toFnsDuration } from "../../states/timeIntervalSlice";
import { Attribute, selectAttributes } from "../../states/attributesSlice";

export function Overview() {
	const selected: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const timeInterval: TimeInterval = useAppSelector(selectTimeInterval).interval;
	const allStudentDetails: Map<number, StudentDetail[]> = useAppSelector(selectStudentDetails).details;
	const selectedAttributes: Attribute[] = useAppSelector(selectAttributes).selected;
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);
	const [sliderConfigs, setSliderConfigs] = useState<SliderConfig | undefined>(undefined);
	const labelY = "Number of Students";
	const dispatch = useAppDispatch();
	const theme = useTheme();

	useEffect(() => {
		const configs = getSliderConfigs(allStudentDetails);
		setSliderConfigs(configs);
		setSliderIndex(configs.min);
	}, [allStudentDetails]);

	useEffect(() => {
		if (selected && timeInterval) {
			dispatch(
				queryAllStudentDetails({
					datasetId: selected.id,
					start: getTime(timeInterval.start),
					end: getTime(timeInterval.end),
					step: milliseconds(toFnsDuration(timeInterval.step))
				})
			);
		}
	}, [selected, timeInterval]);

	const onSliderChange = (date: number) => {
		setSliderIndex(date);
	};

	const getSliderConfigs = (studentDetails: Map<number, StudentDetail[]>): SliderConfig => {
		const allDates = Array.from(studentDetails.keys());
		return {
			min: getTime(min(allDates)),
			max: getTime(max(allDates)),
			marks: allDates.map((d: number) => {
				return {
					value: d,
					label: formatISO(d)
				};
			})
		};
	};

	return sliderIndex && selected && sliderConfigs ? (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: theme.spacing(2),
				height: "100%"
			}}>
			<Grid container spacing={2}>
				{selected.attributes
					.filter((attr) => selectedAttributes.includes(attr))
					.map((attr: string, index: number) => (
						<Grid item xs={2} sm={4} md={4} key={index}>
							<Histogram
								data={allStudentDetails.get(sliderIndex) || []}
								attribute={attr}
								labelX={attr}
								labelY={labelY}
							/>
						</Grid>
					))}
			</Grid>
			<TimeSlider onChange={onSliderChange} value={sliderIndex} {...sliderConfigs} />
		</Box>
	) : (
		<Typography>Nothing to show yet!</Typography>
	);
}
