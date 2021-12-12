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
import { formatISO, getTime, max, min } from "date-fns";
import { Container, List, ListItem, ListSubheader, Stack, styled, Typography } from "@mui/material";
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

export function IndicatorsBoard() {
	const queriedIndicators: QueriedIndicator[] = useAppSelector(selectIndicators).queriedIndicators;
	const queriedOutcome: QueriedOutcome | undefined = useAppSelector(selectOutcome).queriedOutcome;
	const allStudents = useAppSelector(selectAllStudents).students;
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);
	const [packProps, setPackProps] = useState<CircularPackingProps>({
		nodes: [],
		links: [],
		onSelectIndicator: (i: string) => {}
	});
	const [ratioProps, setRatioProps] = useState<RatioProps>({ nodes: [], links: [] });
	const dispatch = useAppDispatch();

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
		const outcomeSet = new Set(outcomeStudents);
		let props: { nodeGroup: NodeGroup; link: Link }[] = [];
		indicatorStudents.forEach((i: { name: string; students: string[] }) => {
			if (outcomeSet.size > 0 && i.students.length > 0) {
				let tp: string[] = [],
					fp: string[] = [],
					fn = [];
				const indicatorSet = new Set(i.students);
				i.students.forEach((s) => (outcomeSet.has(s) ? tp.push(s) : fp.push(s)));
				fn = outcomeStudents.filter((s: string) => !indicatorSet.has(s));
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
			nodes: [constructNodeGroup("Outcome", outcomeStudents, []), ...props.map((p) => p.nodeGroup)],
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
		allStudents: string[]
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
					nodeGroup: constructRatioGroup(i.name, tp, fp, allStudents, outcomeStudents),
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
				constructRatioGroup("Outcome", outcomeStudents, [], allStudents, outcomeStudents),
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
					label: formatISO(d)
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
			setRatioProps(computeRatioProps(outcomeStudents, indicatorStudents, allStudents));
		}
	};

	if (queriedIndicators.length > 0 && queriedOutcome!) {
		const sliderConfigs = getSliderConfigs(
			queriedIndicators.map((i) => i.students),
			queriedOutcome!.students
		);
		return (
			<div>
				<Stack direction="row">
					<Stack>
						<CircularPacking {...packProps} />
						<PieChartRatios {...ratioProps} />
					</Stack>
					<HistogramWidgetList sliderIndex={sliderIndex} />
				</Stack>
				<TimeSlider onChange={onSliderChange} value={sliderIndex} {...sliderConfigs} />
			</div>
		);
	} else {
		return <Typography>Nothing to show yet!</Typography>;
	}
}

export interface HistogramWidgetListProps {
	sliderIndex: number | undefined;
}

function HistogramWidgetList(props: HistogramWidgetListProps) {
	const widgetDetails: StudentDetail[] = useAppSelector(selectWidgetStudentDetails).details;
	const selectedIndicator: QueriedIndicator | undefined = useAppSelector(selectWidgetStudentDetails).selected;
	const queriedOutcome: QueriedOutcome | undefined = useAppSelector(selectOutcome).queriedOutcome;
	const selectedDataset: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const dispatch = useAppDispatch();

	const getHistogramWidgetProps = (attr: Attribute): HistogramWidgetProps => {
		const indicator = {
			name: selectedIndicator!.name,
			students: new Set(selectedIndicator!.students.get(props.sliderIndex!) || [])
		};
		return {
			indicator: indicator,
			outcome: { name: "Outcome", students: new Set(queriedOutcome!.students.get(props.sliderIndex!) || []) },
			data: widgetDetails,
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

	if (selectedIndicator && queriedOutcome && widgetDetails.length > 0 && props.sliderIndex) {
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
				}>
				{attributes.map((attr) => (
					<ListItem key={attr}>
						<HistogramWidget {...getHistogramWidgetProps(attr)} />
					</ListItem>
				))}
			</List>
		);
	} else {
		return <Stack>Select indicator to see details</Stack>;
	}
}
