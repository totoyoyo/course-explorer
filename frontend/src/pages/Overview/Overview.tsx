import Histogram from "../../components/Histogram/Histogram";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../states/hooks";
import { SliderConfig, TimeSlider } from "../../components/TimeSlider/TimeSlider";
import { selectStudentDetails, StudentDetail } from "../../states/studentDetailsSlice";
import { format, getTime, max, min } from "date-fns";
import Grid from "@mui/material/Grid";
import { Dataset, selectDatasets } from "../../states/datasetSlice";
import { Attribute, selectAttributes } from "../../states/attributesSlice";

export function Overview() {
	const selected: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const { loadingDetails, details }: { loadingDetails: boolean; details: Map<number, StudentDetail[]> } =
		useAppSelector(selectStudentDetails);
	const selectedAttributes: Attribute[] = useAppSelector(selectAttributes).selected;
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);
	const [sliderConfigs, setSliderConfigs] = useState<SliderConfig | undefined>(undefined);
	const labelY = "Number of Students";
	const theme = useTheme();

	useEffect(() => {
		const configs = getSliderConfigs(details);
		setSliderConfigs(configs);
		setSliderIndex(configs.min);
	}, [details]);

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
					label: format(d, "MM/dd/yyyy")
				};
			})
		};
	};

	if (selected && (loadingDetails || details.size > 0)) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: theme.spacing(2),
					height: "100%"
				}}>
				<Grid container spacing={2} sx={{ height: "100%" }}>
					{selected.attributes
						.filter((attr) => selectedAttributes.includes(attr))
						.map((attr: string, index: number) => (
							<Grid item xs={2} sm={4} md={4} key={index}>
								{!loadingDetails && sliderIndex ? (
									<Histogram
										data={details.get(sliderIndex) || []}
										attribute={attr}
										labelX={attr}
										labelY={labelY}
									/>
								) : (
									<Skeleton variant="rectangular" height={"100%"} />
								)}
							</Grid>
						))}
				</Grid>
				{!loadingDetails && sliderIndex && sliderConfigs ? (
					<TimeSlider onChange={onSliderChange} value={sliderIndex} {...sliderConfigs} />
				) : (
					<Skeleton variant="text" />
				)}
			</Box>
		);
	} else {
		return (
			<Stack
				direction="column"
				spacing={2}
				sx={{
					justifyContent: "center",
					height: "100%",
					alignItems: "center"
				}}>
				<Typography variant="h4">Nothing to see yet!</Typography>
				<Typography>Configure dataset in the sidebar</Typography>
			</Stack>
		);
	}
}
