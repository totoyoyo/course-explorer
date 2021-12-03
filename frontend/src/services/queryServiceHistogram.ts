export interface QueryRequest {
	start: string;
	end: string;
	step: number; // ms
	name: string;
	query: string;
}

export interface ResponseEntry {
	[time: string]: {};
}
export interface QueryResponse {
	results: ResponseEntry;
}

const getMockResponse = (attribute: string): QueryResponse => {
	switch (attribute) {
		case "officeHours":
			return {
				results: {
					"2021-11-13T22:17:28.123Z": [
						{ name: "student1", officeHours: 20 },
						{ name: "student2", officeHours: 2 },
						{ name: "student3", officeHours: 10 },
						{ name: "student4", officeHours: 12 },
						{ name: "student5", officeHours: 12 },
						{ name: "student6", officeHours: 12 },
						{ name: "student7", officeHours: 30 },
						{ name: "student8", officeHours: 19 },
						{ name: "student9", officeHours: 19 },
						{ name: "student10", officeHours: 19 }
					],
					"2021-11-20T14:48:00.000Z": [
						{ name: "student1", officeHours: 40 },
						{ name: "student2", officeHours: 20 },
						{ name: "student3", officeHours: 22 },
						{ name: "student4", officeHours: 12 },
						{ name: "student5", officeHours: 33 },
						{ name: "student6", officeHours: 12 },
						{ name: "student7", officeHours: 28 },
						{ name: "student8", officeHours: 40 },
						{ name: "student9", officeHours: 19 },
						{ name: "student10", officeHours: 19 }
					],
					"2021-11-27T14:48:00.000Z": [
						{ name: "student1", officeHours: 43 },
						{ name: "student2", officeHours: 25 },
						{ name: "student3", officeHours: 28 },
						{ name: "student4", officeHours: 19 },
						{ name: "student5", officeHours: 50 },
						{ name: "student6", officeHours: 12 },
						{ name: "student7", officeHours: 28 },
						{ name: "student8", officeHours: 40 },
						{ name: "student9", officeHours: 19 },
						{ name: "student10", officeHours: 19 }
					]
				}
			};
		case "piazzaPosts":
			return {
				results: {
					"2021-11-13T22:17:28.123Z": [
						{ name: "student1", piazzaPosts: 0 },
						{ name: "student2", piazzaPosts: 0 },
						{ name: "student3", piazzaPosts: 0 },
						{ name: "student4", piazzaPosts: 2 },
						{ name: "student5", piazzaPosts: 12 },
						{ name: "student6", piazzaPosts: 12 },
						{ name: "student7", piazzaPosts: 3 },
						{ name: "student8", piazzaPosts: 10 },
						{ name: "student9", piazzaPosts: 5 },
						{ name: "student10", piazzaPosts: 6 }
					],
					"2021-11-20T14:48:00.000Z": [
						{ name: "student1", piazzaPosts: 0 },
						{ name: "student2", piazzaPosts: 0 },
						{ name: "student3", piazzaPosts: 0 },
						{ name: "student4", piazzaPosts: 12 },
						{ name: "student5", piazzaPosts: 18 },
						{ name: "student6", piazzaPosts: 19 },
						{ name: "student7", piazzaPosts: 13 },
						{ name: "student8", piazzaPosts: 10 },
						{ name: "student9", piazzaPosts: 15 },
						{ name: "student10", piazzaPosts: 16 }
					],
					"2021-11-27T14:48:00.000Z": [
						{ name: "student1", piazzaPosts: 0 },
						{ name: "student2", piazzaPosts: 10 },
						{ name: "student3", piazzaPosts: 5 },
						{ name: "student4", piazzaPosts: 3 },
						{ name: "student5", piazzaPosts: 12 },
						{ name: "student6", piazzaPosts: 12 },
						{ name: "student7", piazzaPosts: 6 },
						{ name: "student8", piazzaPosts: 16 },
						{ name: "student9", piazzaPosts: 10 },
						{ name: "student10", piazzaPosts: 8 }
					]
				}
			};
		case "numberOfCommits":
			return {
				results: {
					"2021-11-13T22:17:28.123Z": [
						{ name: "student1", numberOfCommits: 0 },
						{ name: "student2", numberOfCommits: 0 },
						{ name: "student3", numberOfCommits: 5 },
						{ name: "student4", numberOfCommits: 3 },
						{ name: "student5", numberOfCommits: 0 },
						{ name: "student6", numberOfCommits: 2 },
						{ name: "student7", numberOfCommits: 1 },
						{ name: "student8", numberOfCommits: 1 },
						{ name: "student9", numberOfCommits: 1 },
						{ name: "student10", numberOfCommits: 2 }
					],
					"2021-11-20T14:48:00.000Z": [
						{ name: "student1", numberOfCommits: 5 },
						{ name: "student2", numberOfCommits: 0 },
						{ name: "student3", numberOfCommits: 5 },
						{ name: "student4", numberOfCommits: 10 },
						{ name: "student5", numberOfCommits: 10 },
						{ name: "student6", numberOfCommits: 12 },
						{ name: "student7", numberOfCommits: 13 },
						{ name: "student8", numberOfCommits: 14 },
						{ name: "student9", numberOfCommits: 15 },
						{ name: "student10", numberOfCommits: 20 }
					],
					"2021-11-27T14:48:00.000Z": [
						{ name: "student1", numberOfCommits: 20 },
						{ name: "student2", numberOfCommits: 2 },
						{ name: "student3", numberOfCommits: 3 },
						{ name: "student4", numberOfCommits: 10 },
						{ name: "student5", numberOfCommits: 10 },
						{ name: "student6", numberOfCommits: 12 },
						{ name: "student7", numberOfCommits: 53 },
						{ name: "student8", numberOfCommits: 44 },
						{ name: "student9", numberOfCommits: 45 },
						{ name: "student10", numberOfCommits: 30 }
					]
				}
			};
		default:
			return { results: {} };
	}
};

const query = (req: QueryRequest): Promise<QueryResponse> => {
	// return axios
	// 	.post("/query", req)
	// 	.then((res: AxiosResponse<QueryResponse>) => {
	// 		return res.data;
	// 	})
	// 	.catch((err) => errorHandler(err));
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(getMockResponse(req.name)), 2000);
	});
};

const QueryServiceHistogram = {
	query
};

export default QueryServiceHistogram;
