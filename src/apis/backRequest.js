import axios from "axios";
import { IP } from '@/config/httpConfig'

const backRequest = axios.create({
	baseURL: `http://${IP}:8888/api`,
	timeout: 1000 * 5
});

backRequest.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
backRequest.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		return Promise.reject(error);
	}
);

export default backRequest;
