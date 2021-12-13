import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import QueryService, { QueryResponse } from "../services/queryService";
import { formatISO, milliseconds, parseISO } from "date-fns";
import { toFnsDuration } from "./timeIntervalSlice";
import { Attribute } from "./attributesSlice";

export interface Indicator {
	name: string;
	query: string;
}

export function NewIndicator(): Indicator {
	return {
		name: "",
		query: ""
	};
}

export interface QueriedIndicator extends Indicator {
	students: Map<number, string[]>;
	attributes: Attribute[];
}

export interface IndicatorsState {
	indicators: Indicator[];
	queriedIndicators: QueriedIndicator[];
}

const initialState: IndicatorsState = {
	indicators: [],
	queriedIndicators: [] as QueriedIndicator[]
};

export const queryAllIndicators = createAsyncThunk<QueriedIndicator[], void, { state: RootState }>(
	"indicators/queryAll",
	async (arg, thunkAPI) => {
		const { indicators, timeInterval } = thunkAPI.getState();
		const start = formatISO(timeInterval.interval.start);
		const end = formatISO(timeInterval.interval.end);
		const step = milliseconds(toFnsDuration(timeInterval.interval.step));
		return Promise.all<QueriedIndicator>(
			indicators.indicators.map((i) =>
				QueryService.query({ start: start, end: end, step: step, query: i.query, name: i.name }).then(
					(res: QueryResponse) => {
						const students = new Map<number, string[]>();
						Object.keys(res.results).forEach((time: string) => {
							students.set(parseISO(time).getTime(), res.results[time]);
						});
						return {
							...i,
							students: students,
							attributes: res.attributes
						};
					}
				)
			)
		);
	}
);

export const indicatorsSlice = createSlice({
	name: "indicators",
	initialState: initialState,
	reducers: {
		addIndicator: (state: IndicatorsState, action: PayloadAction<Indicator>) => {
			state.indicators.push(action.payload);
		},
		editIndicator: (state: IndicatorsState, action: PayloadAction<{ name: string; edited: Indicator }>) => {
			state.indicators = state.indicators.map((i) =>
				i.name === action.payload.name ? action.payload.edited : i
			);
		},
		remIndicator: (state: IndicatorsState, action: PayloadAction<string>) => {
			state.indicators = state.indicators.filter((i) => i.name !== action.payload);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(queryAllIndicators.fulfilled, (state, action: PayloadAction<QueriedIndicator[]>) => {
			state.queriedIndicators = action.payload;
		});
	}
});

export const { addIndicator, editIndicator, remIndicator } = indicatorsSlice.actions;
export const selectIndicators = (state: RootState) => state.indicators;
export default indicatorsSlice.reducer;
