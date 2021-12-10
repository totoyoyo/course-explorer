import axios, { errorHandler } from "./handler";
import { AxiosResponse } from "axios";
import { Attribute } from "../states/attributesSlice";

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

export interface StudentDetailsRequest {
	datasetId: string;
	start?: number;
	end?: number;
	step?: number; //ms
	time?: number;
	attributes?: string[];
	ids?: string[];
}

export interface StudentDetailResponse {
	id: string;
	attributes: { [attribute: Attribute]: string | number };
}

export interface StudentDetailsResponse {
	[time: string]: StudentDetailResponse[];
}

const getStudentDetails = (req: StudentDetailsRequest): Promise<StudentDetailsResponse> => {
	return axios
		.post("/students/details", req)
		.then((res: AxiosResponse<StudentDetailsResponse>) => {
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
