import { configureStore } from "@reduxjs/toolkit";
import indicatorsReducer from "./indicatorsSlice";
import studentReducer from "./studentSlice";
import outcomeReducer from "./outcomeSlice";
import allStudentsReducer from "./allStudentsSlice";
import timeIntervalReducer from "./timeIntervalSlice";
import studentDetailsReducer from "./studentDetailsSlice";
import datasetsReducer from "./datasetSlice";

export const store = configureStore({
	reducer: {
		outcome: outcomeReducer,
		indicators: indicatorsReducer,
		timeInterval: timeIntervalReducer,
		student: studentReducer,
		allStudents: allStudentsReducer,
		studentDetails: studentDetailsReducer,
		datasets: datasetsReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
