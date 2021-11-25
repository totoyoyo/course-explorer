import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useAppDispatch } from "../../states/hooks";
import { Indicator, editIndicator, addIndicator } from "../../states/indicatorsSlice";

export enum IndicatorEditorAction {
	ADD = "Add",
	EDIT = "Edit"
}

export interface IndicatorEditorDialogProps {
	element?: Indicator;
	action?: IndicatorEditorAction;
	onClose?: () => void;
	isOpened: boolean;
}

export function IndicatorEditorDialog(props: IndicatorEditorDialogProps) {
	const [name, setName] = useState<string>(props.element?.name || "");
	const [query, setQuery] = useState<string>(props.element?.query || "");
	const dispatch = useAppDispatch();

	const handleActionClick = () => {
		if (props.action === IndicatorEditorAction.ADD) {
			dispatch(addIndicator({ name: name, query: query }));
		} else if (props.action === IndicatorEditorAction.EDIT) {
			dispatch(editIndicator({ name: props.element!.name, edited: { name: name, query: query } }));
		}
		if (props.onClose) props.onClose();
	};

	return (
		<Dialog open={props.isOpened} onClose={props.onClose}>
			<DialogTitle>Configure query</DialogTitle>
			<DialogContent>
				<Stack spacing={2} direction="column">
					<TextField
						id="name"
						label="Name"
						defaultValue={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
					/>
					<TextField
						id="query"
						label="Query"
						defaultValue={query}
						onChange={(e) => setQuery(e.target.value)}
						multiline
						fullWidth
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button onClick={handleActionClick}>{props.action}</Button>
			</DialogActions>
		</Dialog>
	);
}
