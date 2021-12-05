import Histogram from "../../components/Histogram/Histogram";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { TimeSlider } from "../../components/TimeSlider/TimeSlider";
import { queryAllStudentDetails, selectStudentDetails, StudentDetail } from "../../states/studentDetailsSlice";
import { getTime, parseISO } from "date-fns";
import Grid from "@mui/material/Grid";
const MOCK_ATTRIBUTES = ["officeHours", "piazzaPosts", "numberOfCommits"];

export function Overview() {
	const [attributes, setAttributes] = useState<string[]>(MOCK_ATTRIBUTES);
	const allStudentDetails: Map<number, StudentDetail[]> = useAppSelector(selectStudentDetails).details;
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);
	const labelY = "Number of Students";
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(queryAllStudentDetails({ start: 0, end: 0, step: 0 }));
	}, [dispatch]);

	const onSliderChange = (date: number) => {
		setSliderIndex(date);
	};

	const getSliderConfigs = () => {
		const min = getTime(parseISO("2021-11-13T22:17:28.123Z"));
		const max = getTime(parseISO("2021-11-27T14:48:00.000Z"));
		return {
			min: min,
			max: max,
			marks: [
				{
					value: min,
					label: "2021-11-13T22:17:28.123Z"
				},
				{
					value: getTime(parseISO("2021-11-20T14:48:00.000Z")),
					label: "2021-11-20T14:48:00.000Z"
				},
				{
					value: max,
					label: "2021-11-27T14:48:00.000Z"
				}
			]
		};
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			{sliderIndex && (
				<Grid container spacing={2}>
					{attributes.map((attr: string, index: number) => (
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
			)}
			<TimeSlider onChange={onSliderChange} value={sliderIndex} {...getSliderConfigs()} />
		</Box>
	);
}
