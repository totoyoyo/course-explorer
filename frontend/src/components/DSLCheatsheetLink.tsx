import { IconButton, InputAdornment } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import React from "react";

export default function DSLCheatsheetLink() {
	return (
		<InputAdornment
			position={"end"}
			onClick={() => window.open("https://gist.github.com/falkirks/74be2706cd63fc20ca1beee3e918a1ea", "_blank")}>
			<IconButton>
				<HelpIcon />
			</IconButton>
		</InputAdornment>
	);
}
