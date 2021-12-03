import { configureStore } from "@reduxjs/toolkit";
import indicatorsReducer from "./indicatorsSlice";
import studentReducer from "./studentSlice";
import outcomeReducer from "./outcomeSlice";
import allStudentsReducer from "./allStudentsSlice";
import timeIntervalReducer from "./timeIntervalSlice";

export const store = configureStore({
	reducer: {
		outcome: outcomeReducer,
		indicators: indicatorsReducer,
		timeInterval: timeIntervalReducer,
		student: studentReducer,
		allStudents: allStudentsReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
