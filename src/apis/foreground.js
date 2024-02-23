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
		data.product = data.product.filter(item => item.num > 0);
		data.giftProduct = data.giftProduct.filter(item => item.num > 0);
		data.specialProduct = data.specialProduct.filter(item => item.num > 0);
		return frontRequest({
			method: "POST",
			url: "/submit",
			data: data
		});
	},
	save(data) {
		return frontRequest({
			method:"POST",
			url:"/save",
			data:data
		})
	},
	getPriceSystem() {
		return backRequest({
			method: "GET",
			url: "/price_systemlist"
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
