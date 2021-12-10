import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import StudentService, { StudentDetailListRequest, StudentDetailListResponse } from "../services/studentService";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { QueriedIndicator } from "./indicatorsSlice";
import { StudentDetail } from "./studentDetailsSlice";

export interface WidgetStudentDetailsState {
	selected: QueriedIndicator | undefined;
	details: StudentDetail[];
}

const initialState: WidgetStudentDetailsState = {
	selected: undefined,
	details: [] as StudentDetail[]
};

export const queryWidgetStudentDetails = createAsyncThunk<
	StudentDetail[],
	StudentDetailListRequest,
	{ state: RootState }
>("widgetStudentDetails/query", async (arg) => {
	return StudentService.getStudentDetails(arg).then((res: StudentDetailListResponse) => {
		// widget should only be for single time point
		if (Object.values(res).length > 0) {
			return Object.values(res)[0].map((detail) => {
				return { id: detail.id, ...detail.attributes };
			});
		} else {
			return [];
		}
	});
});

export const widgetStudentDetailsSlice = createSlice({
	name: "widgetStudentDetails",
	initialState: initialState,
	reducers: {
		setSelectedIndicator: (
			state: WidgetStudentDetailsState,
			action: PayloadAction<QueriedIndicator | undefined>
		) => {
			state.selected = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(queryWidgetStudentDetails.fulfilled, (state, action: PayloadAction<StudentDetail[]>) => {
			state.details = action.payload;
		});
	}
});

export const { setSelectedIndicator } = widgetStudentDetailsSlice.actions;
export const selectWidgetStudentDetails = (state: RootState) => state.widgetStudentDetails;
export default widgetStudentDetailsSlice.reducer;
