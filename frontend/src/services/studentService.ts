import axios, { errorHandler } from "./handler";
import { AxiosResponse } from "axios";

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

const getAllStudents = (): Promise<StudentListResponse> => {
	// return axios
	// 	.get("/students")
	// 	.then((res: AxiosResponse<StudentListResponse>) => {
	// 		return res.data;
	// 	})
	// 	.catch((err) => errorHandler(err));

	return new Promise((resolve, reject) => {
		setTimeout(
			() =>
				resolve({
					ids: [
						"student1",
						"student2",
						"student3",
						"student4",
						"student5",
						"student6",
						"student7",
						"student8",
						"student9"
					]
				}),
			2000
		);
	});
};

const StudentService = {
	getStudent,
	getAllStudents
};

export default StudentService;
