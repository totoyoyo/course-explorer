import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../states/hooks";
import { IndicatorsState, QueriedIndicator, selectIndicators } from "../../states/indicatorsSlice";
import { getTime, toDate, formatISO, min, max } from "date-fns";
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
import CircularPacking, { NodeGroup } from "../../components/CircularPacking/CircularPacking";
import { IndicatorEditorDialog, IndicatorEditorDialogProps } from "./IndicatorEditorDialog";
import { OutcomeState, QueriedOutcome, selectOutcome } from "../../states/outcomeSlice";

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
					// onChange={(event: React.SyntheticEvent | Event, value: number | Array<number>) => {
					// 	if (typeof value === "number") {
					// 		setValue(value);
					// 	}
					// }}
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
		return <TextField>No query results yet!</TextField>;
	}
}

export function IndicatorsBoard() {
	const indicatorsState: IndicatorsState = useAppSelector(selectIndicators);
	const queriedIndicators: QueriedIndicator[] = indicatorsState.queriedIndicators;
	const outcomeState: OutcomeState = useAppSelector(selectOutcome);
	const queriedOutcome: QueriedOutcome | undefined = outcomeState.queriedOutcome;
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [dialogProps, setDialogProps] = useState<IndicatorEditorDialogProps>({ isOpened: false });
	const [sliderIndex, setSliderIndex] = useState<number | undefined>(undefined);
	const [packData, setPackData] = useState<NodeGroup[]>([]);
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

	const computeNodeGroups = (index: number): NodeGroup[] => {
		if (!queriedOutcome) {
			return [];
		}

		const outcomeStudents: string[] = queriedOutcome.students.get(index) || [];
		const indicatorStudents = queriedIndicators.map((i) => {
			return { name: i.name, students: i.students.get(index) || [] };
		});
		const outcomeNode = {
			id: "outcome",
			name: "outcome",
			children: [
				{
					id: "outcome-true",
					name: "true",
					children: outcomeStudents.map((s) => {
						return { id: `outcome-true-${s}`, name: s, value: 1 };
					})
				}
			]
		};
		const outcomeSet = new Set(outcomeStudents);
		const indicatorNodes = indicatorStudents.map((i: { name: string; students: string[] }) => {
			let intersect: string[] = [];
			let diff: string[] = [];
			i.students.forEach((s) => (outcomeSet.has(s) ? intersect.push(s) : diff.push(s)));
			return {
				id: i.name,
				name: i.name,
				children: [
					{
						id: `${i.name}-true`,
						name: "true",
						children: intersect.map((s) => {
							return { id: `${i.name}-true-${s}`, name: s, value: 1 };
						})
					},
					{
						id: `${i.name}-false`,
						name: "false",
						children: diff.map((s) => {
							return { id: `${i.name}-false-${s}`, name: s, value: 1 };
						})
					}
				]
			};
		});
		return [outcomeNode, ...indicatorNodes];
	};

	const onSliderChange = (date: number) => {
		setSliderIndex(date);
		setPackData(computeNodeGroups(date));
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
				<CircularPacking nodes={packData} />
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
