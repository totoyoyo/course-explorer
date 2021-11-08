import axios from "axios";

export interface ServiceError {
	status?: number;
	message: string;
}

export function errorHandler(err: any) {
	if (err.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		return Promise.reject({
			status: err.response.status,
			message: err.message
		});
	} else if (err.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		return Promise.reject({
			message: "Failed to request service: No response from server"
		});
	} else {
		return Promise.reject({
			message: "Failed to request service"
		});
	}
}

export default axios.create({
	baseURL: "http://localhost:8000",
	headers: {
		"Content-type": "application/json"
	}
});
