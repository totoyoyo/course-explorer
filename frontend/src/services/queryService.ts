import { AxiosResponse } from "axios";
import axios, { errorHandler } from "./handler";

export interface QueryRequest {
	start: string;
	end: string;
	step: number; // ms
	name: string;
	query: string;
}

export interface QueryResponse {
	[time: string]: string[];
}

const query = (req: QueryRequest): Promise<QueryResponse> => {
	return axios
		.post("/query", req)
		.then((res: AxiosResponse<QueryResponse>) => {
			return res.data;
		})
		.catch((err) => errorHandler(err));
};

const QueryService = {
	query
};

export default QueryService;
