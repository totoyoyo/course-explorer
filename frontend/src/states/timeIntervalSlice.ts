import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { RootState } from "./store";

export enum Granularity {
	DAYS = "days",
	WEEKS = "weeks",
	MONTHS = "months"
}

export interface Duration {
	length: number;
	granularity: Granularity;
}

export const toFnsDuration = (d: Duration) => {
	switch (d.granularity) {
		case Granularity.DAYS:
			return { days: d.length };
		case Granularity.WEEKS:
			return { weeks: d.length };
		case Granularity.MONTHS:
			return { months: d.length };
	}
};

export interface TimeInterval {
	start: Date;
	end: Date;
	step: Duration;
}

export interface TimeIntervalState {
	interval: TimeInterval;
}

const MOCK_TIME_INTERVAL: TimeInterval = {
	start: new Date(),
	end: new Date(),
	step: { granularity: Granularity.MONTHS, length: 1 }
};

const initialState: TimeIntervalState = {
	interval: MOCK_TIME_INTERVAL
};

export const timeIntervalSlice = createSlice({
	name: "timeInterval",
	initialState: initialState,
	reducers: {
		setStartTime: (state: TimeIntervalState, action: PayloadAction<Date>) => {
			state.interval.start = action.payload;
		},
		setEndTime: (state: TimeIntervalState, action: PayloadAction<Date>) => {
			state.interval.end = action.payload;
		},
		setStep: (state: TimeIntervalState, action: PayloadAction<Duration>) => {
			state.interval.step = action.payload;
		}
	}
});

export const { setStartTime, setEndTime, setStep } = timeIntervalSlice.actions;
export const selectTimeInterval = (state: RootState) => state.timeInterval;
export default timeIntervalSlice.reducer;
