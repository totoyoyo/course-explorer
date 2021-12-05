import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import DatasetService, { DatasetResponse } from "../services/datasetService";

export interface Dataset {
	id: string;
	name: string;
	start: number;
	end: number;
	attributes: string[];
}

export interface DatasetState {
	datasets: Dataset[];
	selected: Dataset | undefined;
}

const initialState: DatasetState = {
	datasets: [],
	selected: undefined
};

export const queryDatasets = createAsyncThunk<Dataset[], void, { state: RootState }>("datasets/getAll", async () => {
	return DatasetService.getDatasets().then((res: DatasetResponse) => {
		return res.results;
	});
});

export const datasetSlice = createSlice({
	name: "dataset",
	initialState: initialState,
	reducers: {
		setSelected: (state: DatasetState, action: PayloadAction<string>) => {
			state.selected = state.datasets.find((d) => (d.id = action.payload));
		}
	},
	extraReducers: (builder) => {
		builder.addCase(queryDatasets.fulfilled, (state, action: PayloadAction<Dataset[]>) => {
			state.datasets = action.payload;
		});
	}
});

export const { setSelected } = datasetSlice.actions;
export const selectDatasets = (state: RootState) => state.datasets;
export default datasetSlice.reducer;
