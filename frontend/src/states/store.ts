import { configureStore } from "@reduxjs/toolkit";
import indicatorsReducer from "./indicators/indicatorsSlice";
import studentReducer from "./student/studentSlice";

export const store = configureStore({
	reducer: {
		indicators: indicatorsReducer,
		student: studentReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
