import { configureStore } from "@reduxjs/toolkit";
import indicatorsReducer from "./indicatorsSlice";
import studentReducer from "./studentSlice";
import allStudentsReducer from "./allStudentsSlice";
import outcomeReducer from "./outcomeSlice";
import timeIntervalReducer from "./timeIntervalSlice";

export const store = configureStore({
	reducer: {
		outcome: outcomeReducer,
		indicators: indicatorsReducer,
		timeInterval: timeIntervalReducer,
		student: studentReducer,
		allStudents: allStudentsReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
