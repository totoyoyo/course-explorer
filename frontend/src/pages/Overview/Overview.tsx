import Histogram from "../../components/Histogram/Histogram";
import { Box, Slider, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formatISO, getTime, max, min } from "date-fns";
import { useAppSelector } from "../../states/hooks";
import { OutcomeState, QueriedOutcome, selectOutcome } from "../../states/outcomeSlice";
import { DateTimePicker } from "@mui/lab";
import {StudentState, selectAttribute} from "../../states/attributeSlice";
const ATTRIBUTES = ["officeHours", "piazzaPosts", "numberOfCommits"];

const DATA = [
	{
		name: "student1",
		officeHours: 20,
		piazzaPosts: 30,
		numberOfCommits: 2
	},
	{
		name: "student2",
		officeHours: 22,
		piazzaPosts: 8,
		numberOfCommits: 10
	},
	{
		name: "student3",
		officeHours: 1,
		piazzaPosts: 19,
		numberOfCommits: 5
	},
	{
		name: "student4",
		officeHours: 30,
		piazzaPosts: 2,
		numberOfCommits: 12
	},
	{
		name: "student5",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 20
	},
	{
		name: "student6",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student7",
		officeHours: 2,
		piazzaPosts: 19,
		numberOfCommits: 19
	},
	{
		name: "student8",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 20
	},
	{
		name: "student9",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 20
	},
	{
		name: "student10",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 20
	},
	{
		name: "student11",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student12",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student13",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student14",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student15",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student16",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student17",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student18",
		officeHours: 2,
		piazzaPosts: 0,
		numberOfCommits: 2
	}
];
interface TimeSliderProps {
	onChange: (date: number) => void;
	value: number | undefined;
}

function TimeSlider(props: TimeSliderProps) {
	const [value, setValue] = useState<number | undefined>(undefined);
	useEffect(() => {
		setValue(props.value);
	}, [props]);

	const getSliderConfigs = (attributeMaps: Map<number, string[]>[]) => {
		const allDates: number[] = Array.from(new Set(...attributeMaps.flatMap((m) => m.keys())));
		return {
			min: min(allDates),
			max: max(allDates),
			marks: allDates.map((d: number) => {
				return {
					value: d,
					label: formatISO(d)
				};
			})
		};
	};
	const studentState: StudentState = useAppSelector(selectAttribute);
	if (studentState.queriedAttribute) {
	const { min, max, marks } = getSliderConfigs(studentState.queriedAttribute);

	return (
		<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
			<DateTimePicker
				value={getTime(min)}
				label="Start"
				readOnly
				disableOpenPicker
				onChange={() => {}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
			<Slider
				aria-label="Time"
				step={null}
				min={getTime(min)}
				max={getTime(max)}
				marks={marks}
				value={value || getTime(min)}
				onChangeCommitted={(event: React.SyntheticEvent | Event, value: number | Array<number>) => {
					if (typeof value === "number") {
						props.onChange(value);
					}
				}}
			/>
			<DateTimePicker
				value={getTime(max)}
				label="End Time"
				readOnly
				disableOpenPicker
				onChange={() => {}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
		</Stack>
	);
}

export default function Overview() {
	const indicatorsState: IndicatorsState = useAppSelector(selectIndicators);
	const queriedIndicators: QueriedIndicator[] = indicatorsState.queriedIndicators;
	const outcomeState: OutcomeState = useAppSelector(selectOutcome);
	const queriedOutcome: QueriedOutcome | undefined = outcomeState.queriedOutcome;
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);

	const onSliderChange = (date: number) => {
		setSliderIndex(date);
		if (queriedOutcome) {
			const outcomeStudents: string[] = queriedOutcome.students.get(date) || [];
			const indicatorStudents = queriedIndicators.map((i) => {
				return { name: i.name, students: i.students.get(date) || [] };
			});
		}
	};
	return (
		<Box sx={{ display: "flex" }}>
			<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
				{ATTRIBUTES.map((attr) => {
					return <Histogram data={DATA} attribute={attr} lableX={attr} lableY={"Number of Students"} />;
				})}
			</Stack>
			<TimeSlider onChange={onSliderChange} value={sliderIndex} />
		</Box>
	);
}
