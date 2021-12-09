import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Attribute = string;

export interface AttributesState {
	selected: Attribute[];
}

const initialState: AttributesState = {
	selected: []
};

export const attributesSlice = createSlice({
	name: "attributes",
	initialState: initialState,
	reducers: {
		handleSelection: (state: AttributesState, action: PayloadAction<Attribute>) => {
			const selected: Attribute = action.payload;
			state.selected.includes(selected)
				? (state.selected = state.selected.filter((attr) => attr !== selected))
				: (state.selected = state.selected.concat(selected));
		},
		setSelected: (state: AttributesState, action: PayloadAction<Attribute[]>) => {
			state.selected = action.payload;
		}
	}
});

export const { handleSelection, setSelected } = attributesSlice.actions;
export const selectAttributes = (state: RootState) => state.attributes;
export default attributesSlice.reducer;
