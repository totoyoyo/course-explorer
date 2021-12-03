import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Student {
	id: string;
	attribute: Attribute;
}

export interface Attribute {
	name: string;
	value: number;
}

export interface QueriedAttribute {
	studentMap: Map<number, Student[]>;
}

export function NewStudent(): Student {
	return {
		id: "",
		attribute: {
			name: "",
			value: 0
		}
	};
}

export interface StudentState {
	students: Student[];
	queriedAttribute: QueriedAttribute[];
}

const initialState: StudentState = {
	students: [],
	queriedAttribute: [] as QueriedAttribute[]
};

export const attributeSlice = createSlice({
	name: "attributes",
	initialState: initialState,
	reducers: {
		addAttribute: (state: StudentState, action: PayloadAction<Student>) => {
			state.students.push(action.payload);
		},
		editAttribute: (state: StudentState, action: PayloadAction<{ name: string; edited: Student }>) => {
			state.students = state.students.map((i) => (i.id === action.payload.name ? action.payload.edited : i));
		},
		remAttribute: (state: StudentState, action: PayloadAction<string>) => {
			state.students = state.students.filter((i) => i.id !== action.payload);
		}
	}
});

export const { addAttribute, editAttribute, remAttribute } = attributeSlice.actions;
export const selectAttribute = (state: RootState) => state.student;
export default attributeSlice.reducer;
