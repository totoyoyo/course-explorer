import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../states/hooks";
import { IndicatorsState, QueriedIndicator, selectIndicators } from "../../states/indicatorsSlice";
import { getTime, formatISO, min, max } from "date-fns";
import {
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Box,
	IconButton,
	Slider,
	Stack,
	TextField,
	Toolbar,
	Typography
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { DateTimePicker } from "@mui/lab";
import { Sidebar } from "./Sidebar";
import CircularPacking, {
	CircularPackingProps,
	Link,
	NodeGroup
} from "../../components/CircularPacking/CircularPacking";
import { IndicatorEditorDialog, IndicatorEditorDialogProps } from "./IndicatorEditorDialog";
import { OutcomeState, QueriedOutcome, selectOutcome } from "../../states/outcomeSlice";
import VizSwitcher from "../../components/VisSwitcher/VisSwitcher";
import { RatioGroup, RatioProps } from "../../components/PieChartRatios/PieChartRatios";
import { selectAllStudents } from "../../states/allStudentsSlice";

const SIDEBAR_WIDTH = 250; // width of sidebar in px

interface TimeSliderProps {
	onChange: (date: number) => void;
	value: number | undefined;
}

function TimeSlider(props: TimeSliderProps) {
	const [value, setValue] = useState<number | undefined>(undefined);
	useEffect(() => {
		setValue(props.value);
	}, [props]);

	const getSliderConfigs = (indicatorMaps: Map<number, string[]>[], outcomeMap: Map<number, string[]>) => {
		const allDates: number[] = Array.from(new Set(...indicatorMaps.flatMap((m) => m.keys()), outcomeMap.keys()));
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
	const indicatorState: IndicatorsState = useAppSelector(selectIndicators);
	const outcomeState: OutcomeState = useAppSelector(selectOutcome);
	if (indicatorState.queriedIndicators.length > 0 && outcomeState.queriedOutcome) {
		const { min, max, marks } = getSliderConfigs(
			indicatorState.queriedIndicators.map((i) => i.students),
			outcomeState.queriedOutcome.students
		);
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
	} else {
		return <Typography>No query results yet!</Typography>;
	}
}

export function IndicatorsBoard() {
	const indicatorsState: IndicatorsState = useAppSelector(selectIndicators);
	const queriedIndicators: QueriedIndicator[] = indicatorsState.queriedIndicators;
	const outcomeState: OutcomeState = useAppSelector(selectOutcome);
	const queriedOutcome: QueriedOutcome | undefined = outcomeState.queriedOutcome;
	const allStudents = useAppSelector(selectAllStudents).students;
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [dialogProps, setDialogProps] = useState<IndicatorEditorDialogProps>({ isOpened: false });
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);
	const [packProps, setPackProps] = useState<CircularPackingProps>({ nodes: [], links: [] });
	const [ratioProps, setRatioProps] = useState<RatioProps>({ nodes: [], links: [] });
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const onCloseSidebar = () => {
		setSidebarOpen(false);
	};

	const onOpenSidebar = () => {
		setSidebarOpen(true);
	};

	const Main = styled("main", { shouldForwardProp: (prop) => prop !== "sidebarOpen" })<{
		sidebarOpen?: boolean;
	}>(({ theme, sidebarOpen }) => ({
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: `-${SIDEBAR_WIDTH}px`,
		...(sidebarOpen && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
		})
	}));

	interface AppBarProps extends MuiAppBarProps {
		sidebarOpen?: boolean;
	}
	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== "sidebarOpen"
	})<AppBarProps>(({ theme, sidebarOpen }) => ({
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		...(sidebarOpen && {
			width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
			marginLeft: `${SIDEBAR_WIDTH}px`,
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			})
		})
	}));

	const SidebarHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}));

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

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position="fixed" sidebarOpen={sidebarOpen}>
				<Toolbar>
					<IconButton
						onClick={onOpenSidebar}
						edge="start"
						sx={{ mr: 2, ...(sidebarOpen && { display: "none" }) }}>
						<MenuRoundedIcon />
					</IconButton>
					<Typography>Course Friction Explorer</Typography>
				</Toolbar>
			</AppBar>
			<Sidebar
				isOpened={sidebarOpen}
				onClose={onCloseSidebar}
				width={SIDEBAR_WIDTH}
				setDialogProps={(props: IndicatorEditorDialogProps) => setDialogProps(props)}
			/>
			<Main sidebarOpen={sidebarOpen}>
				<SidebarHeader />

				<VizSwitcher circularPacking={packProps} selectedVis="pieCharts" ratioChart={ratioProps} />
				<TimeSlider onChange={onSliderChange} value={sliderIndex} />
				<IndicatorEditorDialog
					isOpened={dialogProps.isOpened}
					action={dialogProps.action}
					element={dialogProps.element}
					onClose={() => setDialogProps({ isOpened: false })}
				/>
			</Main>
		</Box>
	);
}
