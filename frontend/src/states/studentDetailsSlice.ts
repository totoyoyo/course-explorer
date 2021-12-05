import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { parseISO } from "date-fns";
import StudentService, { StudentDetailsRequest, StudentDetailsResponse } from "../services/studentService";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface StudentDetail {
	id: string;
	[attribute: string]: string | number;
}

export interface StudentDetailsState {
	details: Map<number, StudentDetail[]>;
}

const initialState: StudentDetailsState = {
	details: new Map<number, StudentDetail[]>()
};

export const queryAllStudentDetails = createAsyncThunk<
	Map<number, StudentDetail[]>,
	StudentDetailsRequest,
	{ state: RootState }
>("studentDetails/queryAll", async (arg) => {
	return StudentService.getStudentDetails(arg).then((res: StudentDetailsResponse) => {
		const details = new Map<number, StudentDetail[]>();
		Object.keys(res.results).forEach((time: string) => {
			details.set(parseISO(time).getTime(), res.results[time]);
		});
		return details;
	});
});

export const studentDetailsSlice = createSlice({
	name: "studentDetails",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			queryAllStudentDetails.fulfilled,
			(state, action: PayloadAction<Map<number, StudentDetail[]>>) => {
				state.details = action.payload;
			}
		);
	}
});

export const selectStudentDetails = (state: RootState) => state.studentDetails;
export default studentDetailsSlice.reducer;
