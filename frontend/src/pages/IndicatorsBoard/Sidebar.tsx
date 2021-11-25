import React, { useRef } from "react";
import {
	Button,
	Divider,
	Drawer,
	FormControl,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	styled,
	TextField,
	Typography,
	useTheme
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useEffect, useState } from "react";
import {
	Indicator,
	selectIndicators,
	remIndicator,
	NewIndicator,
	IndicatorsState,
	queryAllIndicators
} from "../../states/indicatorsSlice";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { OutcomeState, queryOutcome, selectOutcome, setOutcome } from "../../states/outcomeSlice";
import {
	selectTimeInterval,
	setEndTime,
	setStartTime,
	setStep,
	Granularity,
	TimeIntervalState
} from "../../states/timeIntervalSlice";
import { DateTimePicker } from "@mui/lab";
import { IndicatorEditorAction, IndicatorEditorDialogProps } from "./IndicatorEditorDialog";

function OutcomeSetting() {
	const outcomeState: OutcomeState = useAppSelector(selectOutcome);
	const [query, setQuery] = useState<string>(outcomeState.outcome.query);
	const dispatch = useAppDispatch();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setQuery(event.target.value);
		}
	};
	const handleBlur = () => {
		dispatch(setOutcome({ query: query }));
	};

	return (
		<Stack>
			<Typography variant="h5" mb={3}>
				Outcome
			</Typography>
			<TextField id="outcome-query" label="Query" value={query} onChange={handleChange} onBlur={handleBlur} />
		</Stack>
	);
}

export interface IndicatorsListProps {
	setDialogProps: (props: IndicatorEditorDialogProps) => void;
}
function IndicatorsListSetting(props: IndicatorsListProps) {
	const indicatorsState: IndicatorsState = useAppSelector(selectIndicators);
	const indicators = indicatorsState.indicators;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isMoreOpened = Boolean(anchorEl);
	const dispatch = useAppDispatch();

	const handleAddClick = () => {
		props.setDialogProps({
			element: NewIndicator(),
			action: IndicatorEditorAction.ADD,
			isOpened: true
		});
	};

	const handleEditClick = (i: Indicator) => {
		props.setDialogProps({
			element: i,
			action: IndicatorEditorAction.EDIT,
			isOpened: true
		});
	};

	const handleDeleteClick = (i: Indicator) => {
		dispatch(remIndicator(i.name));
	};

	const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMoreClose = () => {
		setAnchorEl(null);
	};

	const listItems = indicators.map((i: Indicator) => {
		return (
			<ListItem
				secondaryAction={
					<div>
						<IconButton edge="end" aria-label="more" onClick={handleMoreClick}>
							<MoreVertRoundedIcon />
						</IconButton>
						<Menu open={isMoreOpened} anchorEl={anchorEl} onClose={handleMoreClose}>
							<MenuItem
								key="edit"
								onClick={() => {
									handleEditClick(i);
									handleMoreClose();
								}}>
								Edit
							</MenuItem>
							<MenuItem
								key="delete"
								onClick={() => {
									handleDeleteClick(i);
									handleMoreClose();
								}}>
								Delete
							</MenuItem>
						</Menu>
					</div>
				}>
				<ListItemText primary={i.name} />
			</ListItem>
		);
	});
	return (
		<Stack spacing={1}>
			<Typography variant="h5">Indicators</Typography>
			<List component="div" aria-labelledby="indicators-list-header">
				{listItems}
			</List>
			<Button onClick={handleAddClick} variant="text" endIcon={<AddRoundedIcon />} aria-label="add">
				Add new
			</Button>
		</Stack>
	);
}

function TimeIntervalSetting() {
	const timeIntervalState: TimeIntervalState = useAppSelector(selectTimeInterval);
	const interval = timeIntervalState.interval;
	const stepLenRef = useRef<HTMLInputElement>();
	const [stepGranularity, setStepGranularity] = useState<Granularity>(interval.step.granularity);
	const dispatch = useAppDispatch();

	const handleStepChange = () => {
		const len = stepLenRef.current;
		if (!!len && !!stepGranularity) {
			dispatch(setStep({ length: Number(len.value), granularity: stepGranularity }));
		}
	};

	useEffect(handleStepChange, [stepGranularity, dispatch]);

	return (
		<Stack spacing={1}>
			<Typography variant="h5" mb={3}>
				Time interval
			</Typography>
			<DateTimePicker
				value={interval.start}
				label="Start"
				onChange={(value) => {
					if (value) dispatch(setStartTime(value!));
				}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
			<DateTimePicker
				value={interval.end}
				label="End"
				onChange={(value) => {
					if (value) dispatch(setEndTime(value!));
				}}
				renderInput={(params) => <TextField {...params} helperText={null} />}
			/>
			<FormControl sx={{ m: 1 }}>
				<Stack direction="row" spacing={1}>
					<TextField
						onChange={handleStepChange}
						id="standard-number"
						type="number"
						label="Step"
						InputLabelProps={{
							shrink: true
						}}
						variant="outlined"
						value={interval.step.length}
						inputRef={stepLenRef}
					/>
					<Select
						onChange={(e: SelectChangeEvent<string>) => {
							setStepGranularity(e.target.value as Granularity);
						}}
						value={interval.step.granularity}
						autoWidth>
						{Object.values(Granularity).map((g: string) => (
							<MenuItem key={g} value={g}>
								{g}
							</MenuItem>
						))}
					</Select>
				</Stack>
			</FormControl>
		</Stack>
	);
}

export interface SidebarProps {
	width: number;
	isOpened: boolean;
	onClose: () => void;
	setDialogProps: (props: IndicatorEditorDialogProps) => void;
}

export function Sidebar(props: SidebarProps) {
	const [isOpened, setIsOpened] = useState(props.isOpened);
	const theme = useTheme();
	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsOpened(props.isOpened);
	}, [props]);

	const handleSubmitClick = () => {
		dispatch(queryAllIndicators());
		dispatch(queryOutcome());
	};

	const SidebarHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}));

	return (
		<Drawer
			variant="persistent"
			anchor="left"
			open={isOpened}
			sx={{
				width: props.width,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: props.width,
					boxSizing: "border-box"
				}
			}}>
			<SidebarHeader>
				<IconButton onClick={props.onClose}>
					<ChevronLeftRoundedIcon />
				</IconButton>
			</SidebarHeader>
			<Stack m={2} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
				<OutcomeSetting />
				<IndicatorsListSetting setDialogProps={props.setDialogProps} />
				<TimeIntervalSetting />
				<Button variant="contained" onClick={handleSubmitClick}>
					Submit
				</Button>
			</Stack>
		</Drawer>
	);
}
