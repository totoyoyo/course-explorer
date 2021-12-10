import axios, { errorHandler } from "./handler";
import { AxiosResponse } from "axios";
import { Attribute } from "../states/attributesSlice";

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
	attributes: Attribute[];
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
