import { configureStore } from "@reduxjs/toolkit";
import indicatorsReducer from "./indicatorsSlice";
import studentReducer from "./studentSlice";
import outcomeReducer from "./outcomeSlice";
import allStudentsReducer from "./allStudentsSlice";
import timeIntervalReducer from "./timeIntervalSlice";
import studentDetailsReducer from "./studentDetailsSlice";
import widgetDetailsReducer from "./widgetDetailsSlice";
import datasetsReducer from "./datasetSlice";
import attributesReducer from "./attributesSlice";

export const store = configureStore({
	reducer: {
		outcome: outcomeReducer,
		indicators: indicatorsReducer,
		timeInterval: timeIntervalReducer,
		student: studentReducer,
		allStudents: allStudentsReducer,
		studentDetails: studentDetailsReducer,
		widgetStudentDetails: widgetDetailsReducer,
		datasets: datasetsReducer,
		attributes: attributesReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
