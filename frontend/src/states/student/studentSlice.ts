import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface StudentState {}

const initialState: StudentState = {};

export const studentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		// TODO: define as we need them
	}
});

export const selectStudent = (state: RootState) => state.student;

export default studentSlice.reducer;
