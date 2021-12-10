import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import StudentService, { StudentDetailsRequest, StudentDetailsResponse } from "../services/studentService";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { QueriedIndicator } from "./indicatorsSlice";

export interface WidgetStudentDetail {
	id: string;
	[attribute: string]: string | number;
}

export interface WidgetStudentDetailsState {
	selected: QueriedIndicator | undefined;
	details: WidgetStudentDetail[];
}

const initialState: WidgetStudentDetailsState = {
	selected: undefined,
	details: [] as WidgetStudentDetail[]
};

export const queryWidgetStudentDetails = createAsyncThunk<
	WidgetStudentDetail[],
	StudentDetailsRequest,
	{ state: RootState }
>("widgetStudentDetails/query", async (arg) => {
	return StudentService.getStudentDetails(arg).then((res: StudentDetailsResponse) => {
		return Object.values(res.results)[0];
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
		builder.addCase(queryWidgetStudentDetails.fulfilled, (state, action: PayloadAction<WidgetStudentDetail[]>) => {
			state.details = action.payload;
		});
	}
});

export const { setSelectedIndicator } = widgetStudentDetailsSlice.actions;
export const selectWidgetStudentDetails = (state: RootState) => state.widgetStudentDetails;
export default widgetStudentDetailsSlice.reducer;
