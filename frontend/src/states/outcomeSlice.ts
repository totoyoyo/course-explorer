import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { RootState } from "./store";
import { formatISO, milliseconds, parseISO } from "date-fns";
import QueryService, { QueryResponse } from "../services/queryService";
import { toFnsDuration } from "./timeIntervalSlice";
import { Attribute } from "./attributesSlice";

export interface Outcome {
	query: string;
}

export interface QueriedOutcome extends Outcome {
	students: Map<number, string[]>;
	attributes: Attribute[];
}

export interface OutcomeState {
	outcome: Outcome;
	queriedOutcome: QueriedOutcome | undefined;
}

const MOCK_OUTCOME: Outcome = {
	query: ""
};

const initialState: OutcomeState = {
	outcome: MOCK_OUTCOME,
	queriedOutcome: undefined
};

export const queryOutcome = createAsyncThunk<QueriedOutcome, void, { state: RootState }>(
	"outcome/query",
	async (arg, thunkAPI) => {
		const { outcome, timeInterval } = thunkAPI.getState();
		const start = formatISO(timeInterval.interval.start);
		const end = formatISO(timeInterval.interval.end);
		const step = milliseconds(toFnsDuration(timeInterval.interval.step));
		return QueryService.query({
			start: start,
			end: end,
			step: step,
			query: outcome.outcome.query,
			name: "Outcome"
		}).then((res: QueryResponse) => {
			const students = new Map<number, string[]>();
			Object.keys(res.results).forEach((time: string) => {
				students.set(parseISO(time).getTime(), res.results[time]);
			});
			return {
				...outcome.outcome,
				students: students,
				attributes: res.attributes
			};
		});
	}
);

export const outcomeSlice = createSlice({
	name: "outcome",
	initialState: initialState,
	reducers: {
		setOutcome: (state: OutcomeState, action: PayloadAction<Outcome>) => {
			state.outcome = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(queryOutcome.fulfilled, (state, action: PayloadAction<QueriedOutcome>) => {
			state.queriedOutcome = action.payload;
		});
	}
});

export const { setOutcome } = outcomeSlice.actions;
export const selectOutcome = (state: RootState) => state.outcome;
export default outcomeSlice.reducer;
