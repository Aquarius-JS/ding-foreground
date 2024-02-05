import backRequest from "./backRequest";
import frontRequest from "@/apis/frontRequest";

export const ForegroundAPI = {
	getProduct() {
		return frontRequest({
			method: "GET",
			url: "/product"
		});
	},
	submit(data) {
		return frontRequest({
			method: "POST",
			url: "/submit",
			data: data
		});
	},
	getDepartment() {
		return backRequest({
			method: "GET",
			url: "/departments"
		});
	},
	getPlatforms() {
		return backRequest({
			method: "GET",
			url: "/platformlist"
		});
	},
	getTransportations() {
		return backRequest({
			method: "GET",
			url: "/physical/distribution/management"
		});
	}
};

export default ForegroundAPI;
