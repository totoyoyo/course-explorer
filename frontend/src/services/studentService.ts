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
				{
					id: "student1",
					officeHours: 20,
					piazzaPosts: 0,
					numberOfCommits: 0,
					lastFailure: 3,
					coverage: 56,
					lastOHVisitDay: 3
				},
				{
					id: "student2",
					officeHours: 2,
					piazzaPosts: 0,
					numberOfCommits: 0,
					lastFailure: 3,
					coverage: 45,
					lastOHVisitDay: 3
				},
				{
					id: "student3",
					officeHours: 10,
					piazzaPosts: 0,
					numberOfCommits: 5,
					lastFailure: 2,
					coverage: 12,
					lastOHVisitDay: 5
				},
				{
					id: "student4",
					officeHours: 12,
					piazzaPosts: 2,
					numberOfCommits: 3,
					lastFailure: 2,
					coverage: 10,
					lastOHVisitDay: 2
				},
				{
					id: "student5",
					officeHours: 12,
					piazzaPosts: 12,
					numberOfCommits: 0,
					lastFailure: 2,
					coverage: 34,
					lastOHVisitDay: 3
				},
				{
					id: "student6",
					officeHours: 12,
					piazzaPosts: 12,
					numberOfCommits: 2,
					lastFailure: 1,
					coverage: 67,
					lastOHVisitDay: 5
				},
				{
					id: "student7",
					officeHours: 30,
					piazzaPosts: 3,
					numberOfCommits: 1,
					lastFailure: 2,
					coverage: 68,
					lastOHVisitDay: 2
				},
				{
					id: "student8",
					officeHours: 19,
					piazzaPosts: 10,
					numberOfCommits: 1,
					lastFailure: 1,
					coverage: 70,
					lastOHVisitDay: 5
				},
				{
					id: "student9",
					officeHours: 19,
					piazzaPosts: 5,
					numberOfCommits: 1,
					lastFailure: 1,
					coverage: 45,
					lastOHVisitDay: 3
				},
				{
					id: "student10",
					officeHours: 19,
					piazzaPosts: 6,
					numberOfCommits: 2,
					lastFailure: 2,
					coverage: 88,
					lastOHVisitDay: 1
				}
			],
			"2021-11-20T14:48:00.000Z": [
				{
					id: "student1",
					officeHours: 40,
					piazzaPosts: 0,
					numberOfCommits: 5,
					lastFailure: 2,
					coverage: 60,
					lastOHVisitDay: 3
				},
				{
					id: "student2",
					officeHours: 20,
					piazzaPosts: 0,
					numberOfCommits: 0,
					lastFailure: 2,
					coverage: 87,
					lastOHVisitDay: 1
				},
				{
					id: "student3",
					officeHours: 22,
					piazzaPosts: 0,
					numberOfCommits: 5,
					lastFailure: 2,
					coverage: 54,
					lastOHVisitDay: 1
				},
				{
					id: "student4",
					officeHours: 12,
					piazzaPosts: 12,
					numberOfCommits: 10,
					lastFailure: 3,
					coverage: 64,
					lastOHVisitDay: 2
				},
				{
					id: "student5",
					officeHours: 33,
					piazzaPosts: 18,
					numberOfCommits: 10,
					lastFailure: 3,
					coverage: 77,
					lastOHVisitDay: 1
				},
				{
					id: "student6",
					officeHours: 12,
					piazzaPosts: 19,
					numberOfCommits: 12,
					lastFailure: 3,
					coverage: 65,
					lastOHVisitDay: 5
				},
				{
					id: "student7",
					officeHours: 28,
					piazzaPosts: 13,
					numberOfCommits: 13,
					lastFailure: 1,
					coverage: 89,
					lastOHVisitDay: 3
				},
				{
					id: "student8",
					officeHours: 40,
					piazzaPosts: 10,
					numberOfCommits: 14,
					lastFailure: 3,
					coverage: 100,
					lastOHVisitDay: 3
				},
				{
					id: "student9",
					officeHours: 19,
					piazzaPosts: 15,
					numberOfCommits: 15,
					lastFailure: 1,
					coverage: 99,
					lastOHVisitDay: 5
				},
				{
					id: "student10",
					officeHours: 19,
					piazzaPosts: 16,
					numberOfCommits: 20,
					lastFailure: 2,
					coverage: 96,
					lastOHVisitDay: 1
				}
			],
			"2021-11-27T14:48:00.000Z": [
				{
					id: "student1",
					officeHours: 43,
					piazzaPosts: 0,
					numberOfCommits: 20,
					lastFailure: 2,
					coverage: 78,
					lastOHVisitDay: 1
				},
				{
					id: "student2",
					officeHours: 25,
					piazzaPosts: 10,
					numberOfCommits: 2,
					lastFailure: 1,
					coverage: 67,
					lastOHVisitDay: 2
				},
				{
					id: "student3",
					officeHours: 28,
					piazzaPosts: 5,
					numberOfCommits: 3,
					lastFailure: 1,
					coverage: 68,
					lastOHVisitDay: 1
				},
				{
					id: "student4",
					officeHours: 19,
					piazzaPosts: 3,
					numberOfCommits: 10,
					lastFailure: 1,
					coverage: 87,
					lastOHVisitDay: 5
				},
				{
					id: "student5",
					officeHours: 50,
					piazzaPosts: 12,
					numberOfCommits: 10,
					lastFailure: 3,
					coverage: 98,
					lastOHVisitDay: 1
				},
				{
					id: "student6",
					officeHours: 12,
					piazzaPosts: 12,
					numberOfCommits: 12,
					lastFailure: 2,
					coverage: 99,
					lastOHVisitDay: 3
				},
				{
					id: "student7",
					officeHours: 28,
					piazzaPosts: 6,
					numberOfCommits: 53,
					lastFailure: 2,
					coverage: 100,
					lastOHVisitDay: 3
				},
				{
					id: "student8",
					officeHours: 40,
					piazzaPosts: 16,
					numberOfCommits: 44,
					lastFailure: 2,
					coverage: 100,
					lastOHVisitDay: 5
				},
				{
					id: "student9",
					officeHours: 19,
					piazzaPosts: 10,
					numberOfCommits: 45,
					lastFailure: 3,
					coverage: 56,
					lastOHVisitDay: 1
				},
				{
					id: "student10",
					officeHours: 19,
					piazzaPosts: 8,
					numberOfCommits: 30,
					lastFailure: 1,
					coverage: 55,
					lastOHVisitDay: 3
				}
			]
		}
	};
};

export interface StudentDetailsRequest {
	datasetId: string;
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
