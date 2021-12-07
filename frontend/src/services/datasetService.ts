import { Dataset } from "../states/datasetSlice";

export interface DatasetResponse {
	results: Dataset[];
}

const MOCK_DATASETS: Dataset[] = [
	{
		id: "cpsc310",
		name: "cpsc310",
		start: 1610384400000,
		end: 1618016700000,
		attributes: ["officeHours", "piazzaPosts", "numberOfCommits", "lastFailure", "coverage", "lastOHVisitDay"]
	},
	{
		id: "cpsc110",
		name: "cpsc110",
		start: 0,
		end: 1000000,
		attributes: []
	},
	{
		id: "cpsc311",
		name: "cpsc311",
		start: 0,
		end: 10000000,
		attributes: []
	}
];

const getDatasets = (): Promise<DatasetResponse> => {
	// return axios.get("/datasets")
	// 	.then((res: AxiosResponse<DatasetResponse>) => {
	// 		return res.data;
	// 	})
	// 	.catch((err) => errorHandler(err));
	return new Promise((resolve, reject) => {
		setTimeout(
			() =>
				resolve({
					results: MOCK_DATASETS
				}),
			2000
		);
	});
};

const DatasetService = {
	getDatasets
};

export default DatasetService;
