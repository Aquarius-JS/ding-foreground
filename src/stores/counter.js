import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useForegroundStore = defineStore('foreground";', () => {
	const form = ref({
		product: [],
		giftProduct: [],
		specialProduct: [],
		priceSystem: "",
		department: "",
		platform: "",
		onepieceforshipping: false,
		transportationMethod: "",
		money: 0,
		feeRatio: 0
	});

	return { form };
});
