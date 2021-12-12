import React from "react";
import {
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
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
import { IndicatorEditorAction, IndicatorEditorDialogProps } from "./IndicatorEditorDialog";
import { queryStudentList } from "../../states/allStudentsSlice";
import { DatasetSetting } from "../../components/Setting/DatasetSetting";
import { TimeIntervalSetting } from "../../components/Setting/TimeIntervalSetting";
import { Dataset, selectDatasets } from "../../states/datasetSlice";

function OutcomeSetting() {
	const outcomeState: OutcomeState = useAppSelector(selectOutcome);
	const selectedDataset: Dataset | undefined = useAppSelector(selectDatasets).selected;
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

	const isDisabled = () => selectedDataset === undefined;

	return (
		<Stack>
			<Typography variant="h5" mb={3}>
				Outcome
			</Typography>
			<TextField
				id="outcome-query"
				label="Query"
				value={query}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isDisabled()}
			/>
		</Stack>
	);
}

export interface IndicatorsListProps {
	setDialogProps: (props: IndicatorEditorDialogProps) => void;
}
function IndicatorsListSetting(props: IndicatorsListProps) {
	const selectedDataset: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const indicators = useAppSelector(selectIndicators).indicators;
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

	const isAddDisabled = () => selectedDataset === undefined;

	return (
		<Stack spacing={1}>
			<Typography variant="h5">Indicators</Typography>
			<List component="div" aria-labelledby="indicators-list-header">
				{indicators.map((i: Indicator) => (
					<ListItem key={i.name}>
						<ListItemText primary={i.name} />
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
					</ListItem>
				))}
			</List>
			<Button
				onClick={handleAddClick}
				variant="text"
				endIcon={<AddRoundedIcon />}
				aria-label="add"
				disabled={isAddDisabled()}>
				Add new
			</Button>
		</Stack>
	);
}

export interface IndicatorsSidebarProps {
	width: number;
	isOpened: boolean;
	onClose: () => void;
	setDialogProps: (props: IndicatorEditorDialogProps) => void;
}

export function IndicatorsSidebar(props: IndicatorsSidebarProps) {
	const [isOpened, setIsOpened] = useState(props.isOpened);
	const selectedDataset: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const outcome = useAppSelector(selectOutcome).outcome?.query;
	const indicators = useAppSelector(selectIndicators).indicators;

	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsOpened(props.isOpened);
	}, [props]);

	const handleSubmitClick = () => {
		dispatch(queryAllIndicators());
		dispatch(queryOutcome());
		dispatch(queryStudentList());
	};

	const SidebarHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}));

	const isSubmitDisabled = () => {
		return selectedDataset === undefined || !outcome;
	};

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
				<DatasetSetting />
				<TimeIntervalSetting />
				<OutcomeSetting />
				<IndicatorsListSetting setDialogProps={props.setDialogProps} />
				<Button variant="contained" onClick={handleSubmitClick} disabled={isSubmitDisabled()}>
					Submit
				</Button>
			</Stack>
		</Drawer>
	);
}
