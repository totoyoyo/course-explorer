import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import DatasetService, { DatasetResponse } from "../services/datasetService";

export interface Dataset {
	id: string;
	name: string;
	start: string;
	end: string;
	attributes: string[];
}

export interface DatasetState {
	datasets: Dataset[];
	selected: Dataset | undefined;
	loadingDatasets: boolean;
}

const initialState: DatasetState = {
	datasets: [],
	selected: undefined,
	loadingDatasets: false
};

export const queryDatasets = createAsyncThunk<Dataset[], void, { state: RootState }>("datasets/getAll", async () => {
	return DatasetService.getDatasets().then((res: DatasetResponse) => {
		return res.datasets;
	});
});

export const datasetSlice = createSlice({
	name: "dataset",
	initialState: initialState,
	reducers: {
		setSelected: (state: DatasetState, action: PayloadAction<Dataset>) => {
			state.selected = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(queryDatasets.fulfilled, (state, action: PayloadAction<Dataset[]>) => {
				if (state.loadingDatasets) {
					state.datasets = action.payload;
					state.loadingDatasets = false;
				}
			})
			.addCase(queryDatasets.pending, (state, action) => {
				if (!state.loadingDatasets) {
					state.loadingDatasets = true;
				}
			})
			.addCase(queryDatasets.rejected, (state, action) => {
				if (state.loadingDatasets) {
					state.loadingDatasets = false;
				}
			});
	}
});

export const { setSelected } = datasetSlice.actions;
export const selectDatasets = (state: RootState) => state.datasets;
export default datasetSlice.reducer;
