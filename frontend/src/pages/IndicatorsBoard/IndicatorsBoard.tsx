import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../states/hooks";
import { IndicatorsState, QueriedIndicator, selectIndicators } from "../../states/indicatorsSlice";
import CircularPacking, {
	CircularPackingProps,
	Link,
	NodeGroup
} from "../../components/CircularPacking/CircularPacking";
import { OutcomeState, QueriedOutcome, selectOutcome } from "../../states/outcomeSlice";
import { selectAllStudents } from "../../states/allStudentsSlice";
import { TimeSlider } from "../../components/TimeSlider/TimeSlider";
import { formatISO, getTime, max, min } from "date-fns";
import { Typography } from "@mui/material";
import PieChartRatios, { RatioGroup, RatioProps } from "../../components/PieChartRatios/PieChartRatios";

export function IndicatorsBoard() {
	const indicatorsState: IndicatorsState = useAppSelector(selectIndicators);
	const queriedIndicators: QueriedIndicator[] = indicatorsState.queriedIndicators;
	const outcomeState: OutcomeState = useAppSelector(selectOutcome);
	const queriedOutcome: QueriedOutcome | undefined = outcomeState.queriedOutcome;
	const allStudents = useAppSelector(selectAllStudents).students;
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);
	const [packProps, setPackProps] = useState<CircularPackingProps>({ nodes: [], links: [] });
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
		const props: { nodeGroup: NodeGroup; link: Link }[] = indicatorStudents.map(
			(i: { name: string; students: string[] }) => {
				let tp: string[] = [],
					fp: string[] = [],
					fn = [];
				const indicatorSet = new Set(i.students);
				i.students.forEach((s) => (outcomeSet.has(s) ? tp.push(s) : fp.push(s)));
				fn = outcomeStudents.filter((s: string) => !indicatorSet.has(s));
				let f1 = tp.length / (tp.length + 0.5 * (fp.length + fn.length));
				return {
					nodeGroup: constructNodeGroup(i.name, tp, fp),
					link: {
						source: "Outcome",
						target: i.name,
						value: f1
					}
				};
			}
		);
		return {
			nodes: [constructNodeGroup("Outcome", outcomeStudents, []), ...props.map((p) => p.nodeGroup)],
			links: props.map((p) => p.link)
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

	const getSliderConfigs = (indicatorMaps: Map<number, string[]>[], outcomeMap: Map<number, string[]>) => {
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

	return queriedIndicators.length > 0 && queriedOutcome! ? (
		<div>
			<CircularPacking {...packProps} />
			<PieChartRatios {...ratioProps} />
			<TimeSlider
				onChange={onSliderChange}
				value={sliderIndex}
				{...getSliderConfigs(
					queriedIndicators.map((i) => i.students),
					queriedOutcome!.students
				)}
			/>
		</div>
	) : (
		<Typography>Nothing to show yet!</Typography>
	);
}
