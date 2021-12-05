import React, { useRef } from "react";
import { Button, Divider, Drawer, IconButton, Stack, styled, useTheme } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { DatasetSetting } from "../../components/Setting/DatasetSetting";
import { TimeIntervalSetting } from "../../components/Setting/TimeIntervalSetting";

export interface OverviewSidebarProps {
	width: number;
	isOpened: boolean;
	onClose: () => void;
}

export function OverviewSidebar(props: OverviewSidebarProps) {
	const theme = useTheme();
	const dispatch = useAppDispatch();

	const handleSubmitClick = () => {};

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
				<Button variant="contained" onClick={handleSubmitClick}>
					Submit
				</Button>
			</Stack>
		</Drawer>
	);
}
