import React, { useEffect, useState } from "react";
import { IndicatorsBoard } from "./pages/IndicatorsBoard/IndicatorsBoard";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { styled, StyledEngineProvider } from "@mui/material/styles";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { Overview } from "./pages/Overview/Overview";
import {
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Box,
	Drawer,
	IconButton,
	Toolbar,
	Typography,
	Tabs,
	Tab
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IndicatorEditorDialog, IndicatorEditorDialogProps } from "./pages/IndicatorsBoard/IndicatorEditorDialog";
import { IndicatorsSidebar } from "./pages/IndicatorsBoard/IndicatorsSidebar";
import { OverviewSidebar } from "./pages/Overview/OverviewSidebar";
import { queryDatasets } from "./states/datasetSlice";
import { useAppDispatch } from "./states/hooks";

const SIDEBAR_WIDTH = 250; // width of sidebar in px
enum TabID {
	OVERVIEW = "Overview",
	INDICATORS = "Indicators"
}

function App() {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [tabIndex, setTabIndex] = useState<TabID>(TabID.OVERVIEW);
	const [dialogProps, setDialogProps] = useState<IndicatorEditorDialogProps>({ isOpened: false });
	const dispatch = useAppDispatch();

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

	const Main = styled("main", { shouldForwardProp: (prop) => prop !== "sidebarOpen" })<{
		sidebarOpen?: boolean;
	}>(({ theme, sidebarOpen }) => ({
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
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

	const SidebarHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}));

	const getSidebarContents = (tab: TabID) => {
		switch (tab) {
			case TabID.OVERVIEW:
				return <OverviewSidebar width={SIDEBAR_WIDTH} isOpened={sidebarOpen} onClose={onCloseSidebar} />;
			case TabID.INDICATORS:
				return (
					<IndicatorsSidebar
						width={SIDEBAR_WIDTH}
						isOpened={sidebarOpen}
						onClose={onCloseSidebar}
						setDialogProps={setDialogProps}
					/>
				);
		}
	};

	const onCloseSidebar = () => {
		setSidebarOpen(false);
	};

	const onOpenSidebar = () => {
		setSidebarOpen(true);
	};

	const handleTabSwitch = (event: React.SyntheticEvent, next: TabID) => {
		setTabIndex(next);
	};

	useEffect(() => {
		dispatch(queryDatasets());
	}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<StyledEngineProvider injectFirst>
				<Box className="App" sx={{ display: "flex", height: "100%" }}>
					<AppBar position="fixed" sidebarOpen={sidebarOpen}>
						<Toolbar>
							<IconButton
								onClick={onOpenSidebar}
								edge="start"
								sx={{ mr: 2, ...(sidebarOpen && { display: "none" }) }}>
								<MenuIcon />
							</IconButton>
							<Typography>Course Friction Explorer</Typography>
						</Toolbar>
					</AppBar>
					<Sidebar
						isOpened={sidebarOpen}
						onClose={onCloseSidebar}
						width={SIDEBAR_WIDTH}
						contents={getSidebarContents(tabIndex)}
					/>
					<Main sidebarOpen={sidebarOpen}>
						<SidebarHeader />
						<Box sx={{ borderBottom: 1, borderColor: "divider", flexGrow: 0 }}>
							<Tabs value={tabIndex} onChange={handleTabSwitch}>
								<Tab label={TabID.OVERVIEW} value={TabID.OVERVIEW} />
								<Tab label={TabID.INDICATORS} value={TabID.INDICATORS} />
							</Tabs>
						</Box>
						<TabPanel index={TabID.OVERVIEW} value={tabIndex}>
							<Overview />
						</TabPanel>
						<TabPanel index={TabID.INDICATORS} value={tabIndex}>
							<IndicatorsBoard />
						</TabPanel>
						<IndicatorEditorDialog
							isOpened={dialogProps.isOpened}
							action={dialogProps.action}
							element={dialogProps.element}
							onClose={() => setDialogProps({ isOpened: false })}
						/>
					</Main>
				</Box>
			</StyledEngineProvider>
		</LocalizationProvider>
	);
}

export interface SidebarProps {
	width: number;
	isOpened: boolean;
	onClose: () => void;
	contents: JSX.Element | undefined;
}

export function Sidebar(props: SidebarProps) {
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
			{props.contents ? props.contents : <Typography>Nothing to show yet!</Typography>}
		</Drawer>
	);
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: TabID;
	value: TabID;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			{...other}
			sx={{ flexGrow: 1, height: "100%" }}>
			{value === index && children}
		</Box>
	);
}

export default App;
