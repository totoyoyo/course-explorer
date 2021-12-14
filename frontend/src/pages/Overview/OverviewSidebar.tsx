import React from "react";
import {
	Button,
	Divider,
	Drawer,
	FormControlLabel,
	FormGroup,
	IconButton,
	Stack,
	styled,
	Switch,
	Typography
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { DatasetSetting } from "../../components/Setting/DatasetSetting";
import { TimeIntervalSetting } from "../../components/Setting/TimeIntervalSetting";
import { Dataset, selectDatasets } from "../../states/datasetSlice";
import { Attribute, selectAttributes, handleSelection } from "../../states/attributesSlice";
import { queryAllStudentDetails } from "../../states/studentDetailsSlice";
import { getTime, milliseconds } from "date-fns";
import { selectTimeInterval, TimeInterval, toFnsDuration } from "../../states/timeIntervalSlice";

export interface OverviewSidebarProps {
	width: number;
	isOpened: boolean;
	onClose: () => void;
}

function AttributeSetting() {
	const selectedDataset: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const selectedAttributes: Attribute[] = useAppSelector(selectAttributes).selected;
	const dispatch = useAppDispatch();

	const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(handleSelection(event.target.name));
	};

	const checked = (attr: string) => selectedAttributes.includes(attr);

	return (
		<Stack>
			<Typography variant="h5" mb={3}>
				Attributes
			</Typography>
			{selectedDataset && (
				<FormGroup>
					{selectedDataset.attributes.map((attr) => (
						<FormControlLabel
							key={attr}
							control={<Switch checked={checked(attr)} onChange={handleCheck} name={attr} />}
							label={attr}
						/>
					))}
				</FormGroup>
			)}
		</Stack>
	);
}

export function OverviewSidebar(props: OverviewSidebarProps) {
	const selected: Dataset | undefined = useAppSelector(selectDatasets).selected;
	const timeInterval: TimeInterval = useAppSelector(selectTimeInterval).interval;
	const selectedAttributes: Attribute[] = useAppSelector(selectAttributes).selected;
	const dispatch = useAppDispatch();

	const SidebarHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}));

	const handleSubmitClick = () => {
		if (selected && timeInterval) {
			dispatch(
				queryAllStudentDetails({
					datasetId: selected.id,
					start: getTime(timeInterval.start),
					end: getTime(timeInterval.end),
					step: milliseconds(toFnsDuration(timeInterval.step)),
					attributes: selectedAttributes
				})
			);
		}
	};

	const isSubmitDisabled = () => {
		return selected === undefined;
	};

	return (
		<Drawer
			variant="persistent"
			anchor="left"
			open={props.isOpened}
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
				<Button variant="contained" onClick={handleSubmitClick} disabled={isSubmitDisabled()}>
					Submit
				</Button>
				<AttributeSetting />
			</Stack>
		</Drawer>
	);
}
