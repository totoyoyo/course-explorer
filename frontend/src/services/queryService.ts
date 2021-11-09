import axios, { errorHandler } from "./handler";
import { AxiosResponse } from "axios";
import { StudentBase } from "../states/indicators/indicatorsSlice";

export interface QueryRequest {
	start: string;
	end: string;
	step: string;
	query: string;
}

export interface QueryResponse {
	result: StudentBase[];
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
