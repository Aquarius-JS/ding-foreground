import axios from "axios";

const frontRequest = axios.create({
	baseURL: "http://47.108.52.110:8888/front",
	timeout: 1000 * 5
});

frontRequest.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
frontRequest.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		return Promise.reject(error);
	}
);

export default frontRequest;
