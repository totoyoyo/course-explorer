import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { formatISO, milliseconds, parseISO } from "date-fns";
import QueryService, { QueryResponse } from "../services/queryService";
import { QueriedOutcome, queryOutcome } from "./outcomeSlice";
import StudentService, { StudentListResponse } from "../services/studentService";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface AllStudentsState {
	students: string[];
}

const initialState: AllStudentsState = {
	students: []
};

export const queryStudentList = createAsyncThunk<string[], void, { state: RootState }>(
	"students/query",
	async (arg, thunkAPI) => {
		return StudentService.getAllStudents().then((res: StudentListResponse) => {
			return res.ids;
		});
	}
);

export const allStudentsSlice = createSlice({
	name: "allStudents",
	initialState,
	reducers: {
		// TODO: define as we need them
	},
	extraReducers: (builder) => {
		builder.addCase(queryStudentList.fulfilled, (state, action: PayloadAction<string[]>) => {
			state.students = action.payload;
		});
	}
});

export const selectAllStudents = (state: RootState) => state.allStudents;

export default allStudentsSlice.reducer;
