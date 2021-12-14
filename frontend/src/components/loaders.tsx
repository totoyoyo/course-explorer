import { Box, CircularProgress } from "@mui/material";
import React from "react";

export function FullPageCircularLoader() {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}>
			<CircularProgress size={60} />
		</Box>
	);
}
