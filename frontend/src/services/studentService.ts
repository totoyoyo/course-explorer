import axios, { errorHandler } from "./handler";
import { AxiosResponse } from "axios";
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

const getMockDetailsResponse = (): StudentDetailsResponse => {
	return {
		results: {
			"2021-11-13T22:17:28.123Z": [
				{ id: "student1", officeHours: 20, piazzaPosts: 0, numberOfCommits: 0 },
				{ id: "student2", officeHours: 2, piazzaPosts: 0, numberOfCommits: 0 },
				{ id: "student3", officeHours: 10, piazzaPosts: 0, numberOfCommits: 5 },
				{ id: "student4", officeHours: 12, piazzaPosts: 2, numberOfCommits: 3 },
				{ id: "student5", officeHours: 12, piazzaPosts: 12, numberOfCommits: 0 },
				{ id: "student6", officeHours: 12, piazzaPosts: 12, numberOfCommits: 2 },
				{ id: "student7", officeHours: 30, piazzaPosts: 3, numberOfCommits: 1 },
				{ id: "student8", officeHours: 19, piazzaPosts: 10, numberOfCommits: 1 },
				{ id: "student9", officeHours: 19, piazzaPosts: 5, numberOfCommits: 1 },
				{ id: "student10", officeHours: 19, piazzaPosts: 6, numberOfCommits: 2 }
			],
			"2021-11-20T14:48:00.000Z": [
				{ id: "student1", officeHours: 40, piazzaPosts: 0, numberOfCommits: 5 },
				{ id: "student2", officeHours: 20, piazzaPosts: 0, numberOfCommits: 0 },
				{ id: "student3", officeHours: 22, piazzaPosts: 0, numberOfCommits: 5 },
				{ id: "student4", officeHours: 12, piazzaPosts: 12, numberOfCommits: 10 },
				{ id: "student5", officeHours: 33, piazzaPosts: 18, numberOfCommits: 10 },
				{ id: "student6", officeHours: 12, piazzaPosts: 19, numberOfCommits: 12 },
				{ id: "student7", officeHours: 28, piazzaPosts: 13, numberOfCommits: 13 },
				{ id: "student8", officeHours: 40, piazzaPosts: 10, numberOfCommits: 14 },
				{ id: "student9", officeHours: 19, piazzaPosts: 15, numberOfCommits: 15 },
				{ id: "student10", officeHours: 19, piazzaPosts: 16, numberOfCommits: 20 }
			],
			"2021-11-27T14:48:00.000Z": [
				{ id: "student1", officeHours: 43, piazzaPosts: 0, numberOfCommits: 20 },
				{ id: "student2", officeHours: 25, piazzaPosts: 10, numberOfCommits: 2 },
				{ id: "student3", officeHours: 28, piazzaPosts: 5, numberOfCommits: 3 },
				{ id: "student4", officeHours: 19, piazzaPosts: 3, numberOfCommits: 10 },
				{ id: "student5", officeHours: 50, piazzaPosts: 12, numberOfCommits: 10 },
				{ id: "student6", officeHours: 12, piazzaPosts: 12, numberOfCommits: 12 },
				{ id: "student7", officeHours: 28, piazzaPosts: 6, numberOfCommits: 53 },
				{ id: "student8", officeHours: 40, piazzaPosts: 16, numberOfCommits: 44 },
				{ id: "student9", officeHours: 19, piazzaPosts: 10, numberOfCommits: 45 },
				{ id: "student10", officeHours: 19, piazzaPosts: 8, numberOfCommits: 30 }
			]
		}
	};
};

export interface StudentDetailsRequest {
	start: number;
	end: number;
	step: number; //ms
	attributes?: string[];
	ids?: string[];
}

export interface StudentDetailsResponse {
	results: {
		[time: string]: StudentDetail[];
	};
}

const getStudentDetails = (req: StudentDetailsRequest): Promise<StudentDetailsResponse> => {
	// return axios
	// 	.post("/students", req)
	// 	.then((res: AxiosResponse<QueryResponse>) => {
	// 		return res.data;
	// 	})
	// 	.catch((err) => errorHandler(err));
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(getMockDetailsResponse()), 2000);
	});
};

const StudentService = {
	getStudent,
	getAllStudents,
	getStudentDetails
};

export default StudentService;
