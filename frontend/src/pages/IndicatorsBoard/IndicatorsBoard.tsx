import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../states/hooks";
import { QueriedIndicator, selectIndicators } from "../../states/indicatorsSlice";
import CircularPacking, {
	CircularPackingProps,
	Link,
	NodeGroup
} from "../../components/CircularPacking/CircularPacking";
import { QueriedOutcome, selectOutcome } from "../../states/outcomeSlice";
import { selectAllStudents } from "../../states/allStudentsSlice";
import { SliderConfig, TimeSlider } from "../../components/TimeSlider/TimeSlider";
import { format, getTime, max, min } from "date-fns";
import { Box, List, ListItem, ListSubheader, Skeleton, Stack, styled, Typography, useTheme } from "@mui/material";
import PieChartRatios, { RatioGroup, RatioProps } from "../../components/PieChartRatios/PieChartRatios";
import {
	queryWidgetStudentDetails,
	selectWidgetStudentDetails,
	setSelectedIndicator
} from "../../states/widgetDetailsSlice";
import { Attribute } from "../../states/attributesSlice";
import HistogramWidget, { HistogramWidgetProps } from "../../components/HistogramWidget/HistogramWidget";
import { Dataset, selectDatasets } from "../../states/datasetSlice";
import { StudentDetail } from "../../states/studentDetailsSlice";
import { FullPageCircularLoader } from "../../components/loaders";

export function IndicatorsBoard() {
	const { loadingIndicators, queriedIndicators } = useAppSelector(selectIndicators);
	const { loadingOutcome, queriedOutcome } = useAppSelector(selectOutcome);
	const { loadingAllStudents, students } = useAppSelector(selectAllStudents);
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);
	const [sliderConfigs, setSliderConfigs] = useState<SliderConfig | undefined>(undefined);
	const [packProps, setPackProps] = useState<CircularPackingProps>({
		nodes: [],
		links: [],
		onSelectIndicator: (i: string) => {}
	});
	const [ratioProps, setRatioProps] = useState<RatioProps>({ nodes: [], links: [] });
	const dispatch = useAppDispatch();
	const theme = useTheme();

	useEffect(() => {
		if (queriedOutcome) {
			const configs = getSliderConfigs(
				queriedIndicators.map((i) => i.students),
				queriedOutcome.students
			);
			setSliderConfigs(configs);
			onSliderChange(configs.min);
		}
	}, [queriedIndicators, queriedOutcome]);

	const constructNodeGroup = (name: string, tp: string[], fp: string[]): NodeGroup => {
		return {
			id: name,
			name: name,
			children: [
				...(tp.length === 0
					? []
					: [
							{
								id: `${name}-true`,
								name: "true",
								children: tp.map((s) => {
									return { id: `${name}-true-${s}`, name: s };
								})
							}
					  ]),
				...(fp.length === 0
					? []
					: [
							{
								id: `${name}-false`,
								name: "false",
								children: fp.map((s) => {
									return { id: `${name}-false-${s}`, name: s };
								})
							}
					  ])
			]
		};
	};

	const computeCircularPackProps = (
		outcomeStudents: string[],
		indicatorStudents: { name: string; students: string[] }[]
	): CircularPackingProps => {
		const outcomeSet = new Set(outcomeStudents.map((s) => s.substring(0, 5)));
		let props: { nodeGroup: NodeGroup; link: Link }[] = [];
		indicatorStudents.forEach((i: { name: string; students: string[] }) => {
			const students = i.students.map((s) => s.substring(0, 5));
			if (outcomeSet.size > 0 && students.length > 0) {
				let tp: string[] = [],
					fp: string[] = [],
					fn = [];
				const indicatorSet = new Set(students);
				students.forEach((s) => (outcomeSet.has(s) ? tp.push(s) : fp.push(s)));
				fn = Array.from(outcomeSet).filter((s: string) => !indicatorSet.has(s));
				let f1 = tp.length / (tp.length + 0.5 * (fp.length + fn.length));
				props.push({
					nodeGroup: constructNodeGroup(i.name, tp, fp),
					link: {
						source: "Outcome",
						target: i.name,
						value: f1
					}
				});
			}
		});
		return {
			nodes: [
				constructNodeGroup(
					"Outcome",
					outcomeStudents.map((s) => s.substring(0, 5)),
					[]
				),
				...props.map((p) => p.nodeGroup)
			],
			links: props.map((p) => p.link),
			onSelectIndicator: (i: string | undefined) =>
				dispatch(setSelectedIndicator(queriedIndicators.find((indicator) => indicator.name === i)))
		};
	};

	const constructRatioGroup = (
		name: string,
		tp: string[],
		fp: string[],
		all: string[],
		real: string[]
	): RatioGroup => {
		const realn = all.filter((i) => !real.includes(i));
		const n = all.filter((i) => !tp.includes(i) && !fp.includes(i));
		const tn = n.filter((i) => realn.includes(i));
		const fn = n.filter((i) => !realn.includes(i));
		return {
			id: name,
			name: name,
			truePositives: tp.length,
			falsePositives: fp.length,
			trueNegatives: tn.length,
			falseNegatives: fn.length
		};
	};

	const computeRatioProps = (
		outcomeStudents: string[],
		indicatorStudents: { name: string; students: string[] }[],
		students: string[]
	): RatioProps => {
		const outcomeSet = new Set(outcomeStudents);
		const props: { nodeGroup: RatioGroup; link: Link }[] = indicatorStudents.map(
			(i: { name: string; students: string[] }) => {
				let tp: string[] = [],
					fp: string[] = [],
					fn = [];
				const indicatorSet = new Set(i.students);
				i.students.forEach((s) => (outcomeSet.has(s) ? tp.push(s) : fp.push(s)));
				fn = outcomeStudents.filter((s: string) => !indicatorSet.has(s));
				let f1 = tp.length / (tp.length + 0.5 * (fp.length + fn.length));
				return {
					nodeGroup: constructRatioGroup(i.name, tp, fp, students, outcomeStudents),
					link: {
						source: "Outcome",
						target: i.name,
						value: f1
					}
				};
			}
		);
		return {
			nodes: [
				constructRatioGroup("Outcome", outcomeStudents, [], students, outcomeStudents),
				...props.map((p) => p.nodeGroup)
			],
			links: props.map((p) => p.link)
		};
	};

	const getSliderConfigs = (
		indicatorMaps: Map<number, string[]>[],
		outcomeMap: Map<number, string[]>
	): SliderConfig => {
		const allDates: number[] = Array.from(new Set(...indicatorMaps.flatMap((m) => m.keys()), outcomeMap.keys()));
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

	const onSliderChange = (date: number) => {
		setSliderIndex(date);
		if (queriedOutcome) {
			const outcomeStudents: string[] = queriedOutcome.students.get(date) || [];
			const indicatorStudents = queriedIndicators.map((i) => {
				return { name: i.name, students: i.students.get(date) || [] };
			});
			setPackProps(computeCircularPackProps(outcomeStudents, indicatorStudents));
			setRatioProps(computeRatioProps(outcomeStudents, indicatorStudents, students));
		}
	};

	const isLoading = () => loadingOutcome || loadingIndicators || loadingAllStudents;

	if (isLoading()) {
		return <FullPageCircularLoader />;
	} else if (queriedIndicators.length > 0 && queriedOutcome! && sliderConfigs) {
		return (
			<Box sx={{ display: "flex", flexDirection: "column", height: "100%", padding: theme.spacing(2) }}>
				<Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-start",
							height: "100%",
							width: "100%",
							flexBasis: "80%"
						}}>
						<CircularPacking {...packProps} />
						<PieChartRatios {...ratioProps} />
					</Box>
					<Box
						sx={{
							display: "flex",
							height: "100%",
							width: "100%",
							flexBasis: "20%",
							border: 1,
							borderColor: "rgba(0, 0, 0, 0.12)",
							margin: theme.spacing(1)
						}}>
						<HistogramWidgetList sliderIndex={sliderIndex} />
					</Box>
				</Box>
				<TimeSlider onChange={onSliderChange} value={sliderIndex} {...sliderConfigs} />
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
				<Typography>Configure outcome and indicators in the sidebar.</Typography>
			</Stack>
		);
	}
}

export interface HistogramWidgetListProps {
	sliderIndex: number | undefined;
}

function HistogramWidgetList(props: HistogramWidgetListProps) {
	const { loadingDetails, details }: { loadingDetails: boolean; details: StudentDetail[] } =
		useAppSelector(selectWidgetStudentDetails);
	const selectedIndicator: QueriedIndicator | undefined = useAppSelector(selectWidgetStudentDetails).selected;
	const queriedOutcome: QueriedOutcome | undefined = useAppSelector(selectOutcome).queriedOutcome;
	const selectedDataset: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const getHistogramWidgetProps = (attr: Attribute): HistogramWidgetProps => {
		const indicator = {
			name: selectedIndicator!.name,
			students: new Set(selectedIndicator!.students.get(props.sliderIndex!) || [])
		};
		return {
			indicator: indicator,
			outcome: { name: "Outcome", students: new Set(queriedOutcome!.students.get(props.sliderIndex!) || []) },
			data: details,
			attribute: attr,
			labelX: attr,
			labelY: "Number of Students"
		};
	};

	useEffect(() => {
		if (selectedDataset && selectedIndicator && queriedOutcome && props.sliderIndex) {
			const outcomeStudents = queriedOutcome.students.get(props.sliderIndex) || [];
			const indicatorStudents = selectedIndicator.students.get(props.sliderIndex) || [];
			const attributes = new Set(queriedOutcome.attributes.concat(selectedIndicator.attributes));
			dispatch(
				queryWidgetStudentDetails({
					datasetId: selectedDataset.id,
					start: props.sliderIndex,
					end: props.sliderIndex,
					step: 1,
					attributes: Array.from(attributes),
					ids: Array.from(new Set([...outcomeStudents, ...indicatorStudents]))
				})
			);
		}
	}, [selectedIndicator, props.sliderIndex]);

	const HistogramWidgetLegend = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "start"
	}));

	const HistogramWidgetLegendItem = styled("div")(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: theme.spacing(0, 1)
	}));

	const HistogramWidgetLegendColor = styled("div")(({ theme }) => ({
		width: "1rem",
		height: "1rem",
		marginRight: "0.5rem"
	}));

	const HistogramWidgetLegendText = styled("p")(({ theme }) => ({
		fontSize: "1rem",
		margin: 0
	}));

	if (selectedIndicator && queriedOutcome && props.sliderIndex) {
		const attributes = Array.from(new Set(selectedIndicator.attributes.concat(queriedOutcome.attributes)));
		return (
			<List
				subheader={
					<ListSubheader>
						<HistogramWidgetLegend className="histogram-widget-legend">
							<HistogramWidgetLegendItem>
								<HistogramWidgetLegendColor
									className="histogram-widget-legend-color"
									style={{ background: "#69b3a2" }}
								/>
								<HistogramWidgetLegendText>{selectedIndicator.name}</HistogramWidgetLegendText>
							</HistogramWidgetLegendItem>
							<HistogramWidgetLegendItem>
								<HistogramWidgetLegendColor
									className="histogram-widget-legend-color"
									style={{ background: "#404080" }}
								/>
								<HistogramWidgetLegendText>Outcome</HistogramWidgetLegendText>
							</HistogramWidgetLegendItem>
						</HistogramWidgetLegend>
					</ListSubheader>
				}
				sx={{ width: "100%", height: "100%" }}>
				{attributes.map((attr) => (
					<ListItem key={attr} sx={{ width: "100%" }}>
						{!loadingDetails ? (
							<HistogramWidget {...getHistogramWidgetProps(attr)} />
						) : (
							<Skeleton variant="rectangular" width="100%" height="300px" />
						)}
					</ListItem>
				))}
			</List>
		);
	} else {
		return (
			<Box sx={{ padding: theme.spacing(1), textAlign: "center" }}>
				<Typography>Configure dataset in the sidebar</Typography>
			</Box>
		);
	}
}
