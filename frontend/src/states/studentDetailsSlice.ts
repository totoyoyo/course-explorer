import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { parseISO } from "date-fns";
import StudentService, {
	StudentDetailListRequest,
	StudentDetailListResponse,
	StudentDetailResponse
} from "../services/studentService";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { Attribute } from "./attributesSlice";

export interface StudentDetail {
	id: string;
	[attribute: Attribute]: string | number;
}

export interface StudentDetailsState {
	details: Map<number, StudentDetail[]>;
}

const initialState: StudentDetailsState = {
	details: new Map<number, StudentDetail[]>()
};

export const queryAllStudentDetails = createAsyncThunk<
	Map<number, StudentDetail[]>,
	StudentDetailListRequest,
	{ state: RootState }
>("studentDetails/queryAll", async (arg) => {
	return StudentService.getStudentDetails(arg).then((res: StudentDetailListResponse) => {
		const details = new Map<number, StudentDetail[]>();
		Object.keys(res).forEach((time: string) => {
			const flattened: StudentDetail[] = res[time].map((detail: StudentDetailResponse) => {
				return { id: detail.id, ...detail.attributes };
			});
			details.set(parseISO(time).getTime(), flattened);
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
