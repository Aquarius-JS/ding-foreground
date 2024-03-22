import axios from "axios";
import { IP } from "@/config/httpConfig";

const frontRequest = axios.create({
	baseURL: `http://${IP}:8888/front`,
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
