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
	loadingDetails: boolean;
}

const initialState: StudentDetailsState = {
	details: new Map<number, StudentDetail[]>(),
	loadingDetails: false
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
		builder
			.addCase(queryAllStudentDetails.fulfilled, (state, action: PayloadAction<Map<number, StudentDetail[]>>) => {
				if (state.loadingDetails) {
					state.details = action.payload;
					state.loadingDetails = false;
				}
			})
			.addCase(queryAllStudentDetails.pending, (state, action) => {
				if (!state.loadingDetails) {
					state.loadingDetails = true;
				}
			})
			.addCase(queryAllStudentDetails.rejected, (state, action) => {
				if (state.loadingDetails) {
					state.loadingDetails = false;
				}
			});
	}
});

export const selectStudentDetails = (state: RootState) => state.studentDetails;
export default studentDetailsSlice.reducer;
