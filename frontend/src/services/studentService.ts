import axios, { errorHandler } from "./handler";
import { AxiosResponse } from "axios";
import { Attribute } from "../states/attributesSlice";
import { StudentDetail } from "../states/studentDetailsSlice";

export interface StudentResponse {
	id: string;
}

export interface StudentListResponse {
	ids: string[];
}

const getStudent = (id: string): Promise<StudentResponse> => {
	return axios
		.get("/students", { params: { id: id } })
		.then((res: AxiosResponse<StudentResponse>) => {
			return res.data;
		})
		.catch((err) => errorHandler(err));
};

// perhaps need notion of "time"
const getAllStudents = (): Promise<StudentListResponse> => {
	return axios
		.get("/students")
		.then((res: AxiosResponse<StudentListResponse>) => {
			return res.data;
		})
		.catch((err) => errorHandler(err));
};

export interface StudentDetailListRequest {
	datasetId: string;
	start: number; // start of interval
	end: number; // end of interval
	step: number; //ms
	attributes?: string[];
	ids?: string[];
}

export interface StudentDetailResponse {
	id: string;
	attributes: { [attribute: Attribute]: string | number };
}

export interface StudentDetailListResponse {
	[time: string]: StudentDetailResponse[];
}

const getStudentDetails = (req: StudentDetailListRequest): Promise<StudentDetailListResponse> => {
	return axios
		.post("/students/details", req)
		.then((res: AxiosResponse<StudentDetailListResponse>) => {
			return res.data;
		})
		.catch((err) => errorHandler(err));
};

const StudentService = {
	getStudent,
	getAllStudents,
	getStudentDetails
};

export default StudentService;
