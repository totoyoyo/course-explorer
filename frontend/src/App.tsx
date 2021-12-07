import React from "react";
import "./App.css";
import { IndicatorsBoard } from "./pages/IndicatorsBoard/IndicatorsBoard";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<StyledEngineProvider injectFirst>
				<div className="App">
					<IndicatorsBoard />
				</div>
			</StyledEngineProvider>
		</LocalizationProvider>
	);
}

export default App;
