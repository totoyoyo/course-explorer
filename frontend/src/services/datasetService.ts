import { Dataset } from "../states/datasetSlice";
import { AxiosResponse } from "axios";
import axios, { errorHandler } from "./handler";

export interface DatasetResponse {
	datasets: Dataset[];
}

const getDatasets = (): Promise<DatasetResponse> => {
	return axios
		.get("/datasets/")
		.then((res: AxiosResponse<DatasetResponse>) => {
			return res.data;
		})
		.catch((err) => errorHandler(err));
};

const DatasetService = {
	getDatasets
};

export default DatasetService;
