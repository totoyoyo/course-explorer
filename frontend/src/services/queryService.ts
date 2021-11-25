import axios, { errorHandler } from "./handler";
import { AxiosResponse } from "axios";
import { Indicator } from "../states/indicatorsSlice";
import { Outcome } from "../states/outcomeSlice";

export interface QueryRequest {
	start: string;
	end: string;
	step: number; // ms
	name: string;
	query: string;
}

export interface ResponseEntry {
	[time: string]: string[];
}
export interface QueryResponse {
	results: ResponseEntry;
}

const getMockResponse = (indicator: string): QueryResponse => {
	switch (indicator) {
		case "Outcome":
			return {
				results: {
					"2021-11-13T22:17:28.123Z": ["student1", "student2", "student3", "student4", "student5"],
					"2021-11-20T14:48:00.000Z": ["student1", "student3", "student4", "student5"],
					"2021-11-27T14:48:00.000Z": ["student3", "student4", "student5", "student7"]
				}
			};
		case "Indicator 1":
			return {
				results: {
					"2021-11-13T22:17:28.123Z": [
						"student1",
						"student2",
						"student3",
						"student4",
						"student5",
						"student6",
						"student7"
					],
					"2021-11-20T14:48:00.000Z": ["student1", "student3", "student4", "student5", "student7"],
					"2021-11-27T14:48:00.000Z": ["student1", "student2", "student3", "student4", "student5", "student7"]
				}
			};
		case "Indicator 2":
			return {
				results: {
					"2021-11-13T22:17:28.123Z": ["student1", "student3"],
					"2021-11-20T14:48:00.000Z": ["student1", "student3", "student5"],
					"2021-11-27T14:48:00.000Z": ["student1", "student3", "student5"]
				}
			};
		case "Indicator 3":
			return {
				results: {
					"2021-11-13T22:17:28.123Z": ["student1", "student3", "student5"],
					"2021-11-20T14:48:00.000Z": ["student1", "student5", "student7"],
					"2021-11-27T14:48:00.000Z": ["student1"]
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

const QueryService = {
	query
};

export default QueryService;
