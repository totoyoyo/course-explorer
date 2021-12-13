import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import StudentService, { StudentListResponse } from "../services/studentService";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface AllStudentsState {
	students: string[];
	loadingAllStudents: boolean;
}

const initialState: AllStudentsState = {
	students: [],
	loadingAllStudents: false
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
		builder
			.addCase(queryStudentList.fulfilled, (state, action: PayloadAction<string[]>) => {
				if (state.loadingAllStudents) {
					state.students = action.payload;
					state.loadingAllStudents = false;
				}
			})
			.addCase(queryStudentList.pending, (state, action) => {
				if (!state.loadingAllStudents) {
					state.loadingAllStudents = true;
				}
			})
			.addCase(queryStudentList.rejected, (state, action) => {
				if (state.loadingAllStudents) {
					state.loadingAllStudents = false;
				}
			});
	}
});

export const selectAllStudents = (state: RootState) => state.allStudents;

export default allStudentsSlice.reducer;
