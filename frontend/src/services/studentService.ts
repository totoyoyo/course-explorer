import axios, { errorHandler } from "./handler";
import { AxiosResponse } from "axios";

export interface StudentResponse {
	id: string;
}

const getStudent = (id: string): Promise<StudentResponse> => {
	return axios
		.get("/students", { params: { id: id } })
		.then((res: AxiosResponse<StudentResponse>) => {
			return res.data;
		})
		.catch((err) => errorHandler(err));
};

const StudentService = {
	getStudent
};

export default StudentService;
