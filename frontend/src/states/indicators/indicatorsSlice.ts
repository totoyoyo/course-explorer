import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import QueryService, { QueryResponse } from "../../services/queryService";

export interface Indicator {
	name: string;
	query: string;
	students: StudentBase[];
}

export interface StudentBase {
	id: string;
}

export interface IndicatorsState {
	indicators: Indicator[];
	outcome: Indicator | undefined;
}

const initialState: IndicatorsState = {
	indicators: [{ name: "i1", query: "", students: [] }] as Indicator[],
	outcome: undefined
};

export const queryAllIndicators = createAsyncThunk<
	Indicator[],
	{ start: string; end: string; step: string },
	{ state: RootState }
>("indicators/queryAll", async (arg: { start: string; end: string; step: string }, thunkAPI) => {
	const { indicators } = thunkAPI.getState();
	return Promise.all<Indicator>(
		indicators.indicators.map((i) =>
			QueryService.query({ ...arg, query: i.query }).then((res: QueryResponse) => {
				return {
					...i,
					students: res.result
				};
			})
		)
	);
});

export const indicatorsSlice = createSlice({
	name: "indicators",
	initialState: initialState,
	reducers: {
		addIndicator: (state: IndicatorsState, action: PayloadAction<Indicator>) => {
			state.indicators.push(action.payload);
		},
		remIndicator: (state: IndicatorsState, action: PayloadAction<string>) => {
			state.indicators.filter((i) => i.name !== action.payload);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(queryAllIndicators.fulfilled, (state, action: PayloadAction<Indicator[]>) => {
			state.indicators = state.indicators.map((i) => action.payload.find((other) => other.name === i.name) || i);
			if (state.outcome) {
				state.outcome = action.payload.find((other) => state.outcome!.name === other.name);
			}
		});
	}
});

export const { addIndicator, remIndicator } = indicatorsSlice.actions;
export const selectIndicators = (state: RootState) => state.indicators;
export default indicatorsSlice.reducer;
