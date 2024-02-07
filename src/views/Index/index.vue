<script setup>
import { onMounted, ref, computed } from "vue";
import { remove } from "lodash";
import { ForegroundAPI } from "@/apis";
import ProductSelect from "@/components/ProductSelect/index.vue";
import SpecialProduct from "@/components/SpecialProduct/index.vue";
const ProductList = ref([]);
const PriceSystem = ref([]);
const DepartmentList = ref([]);
const PlatFormList = ref([]);
const TransportationList = ref([]);
const color = ref("");
const init = async () => {
	let res = await ForegroundAPI.getProduct();
	ProductList.value = res.data;
	res = await ForegroundAPI.getPriceSystem();
	PriceSystem.value = res.data;
	res = await ForegroundAPI.getDepartment();
	DepartmentList.value = res.data;
	res = await ForegroundAPI.getPlatforms();
	PlatFormList.value = res.data;
	res = await ForegroundAPI.getTransportations();
	TransportationList.value = res.data;
};
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
const addSpecial = () => {
	form.value.specialProduct.unshift({
		name: "",
		num: 1,
		cost: 0
	});
};
const delSpecial = name => {
	console.log(name);
	remove(form.value.specialProduct, { name });
};
const submit = async () => {
	let res = await ForegroundAPI.submit({
		...form.value,
		money: form.value.money * 1,
		feeRatio: form.value.feeRatio * 1
	});
	color.value = res.color;
};
onMounted(async () => {
	await init();
	form.value.product = ProductList.value.map(item => ({
		name: item.name,
		num: 0
	}));
	form.value.giftProduct = ProductList.value.map(item => ({
		name: item.name,
		num: 0
	}));
});
</script>

<template>
	<div class="index">
		<el-container>
			<el-aside width="200px">
				<div class="left">
					<product-select option-name="请选择商品" v-model:list="form.product" />
					<product-select option-name="请选择赠品" v-model:list="form.giftProduct" />
					<special-product
						option-name="添加特殊商品"
						v-model:list="form.specialProduct"
						@addSpecial="addSpecial"
						@delSpecial="delSpecial"
					/>
					<el-select
						v-model="form.priceSystem"
						class="m-2"
						filterable
						placeholder="请选择价格体系"
						style="width: 200px"
					>
						<el-option
							v-for="item in PriceSystem"
							:key="item.id"
							:label="item.price_system_name"
							:value="item.price_system_name"
						/>
					</el-select>
					<el-select
						v-model="form.department"
						class="m-2"
						filterable
						placeholder="请选择部门"
						style="width: 200px"
					>
						<el-option
							v-for="item in DepartmentList"
							:key="item.id"
							:label="item.department_name"
							:value="item.department_name"
						/>
					</el-select>
					<el-select
						v-model="form.platform"
						class="m-2"
						filterable
						placeholder="请选择平台"
						style="width: 200px"
					>
						<el-option
							v-for="item in PlatFormList"
							:key="item.id"
							:label="item.platform_name"
							:value="item.platform_name"
						/>
					</el-select>
					<div class="one flex items-center text-sm">
						<span>一件代发：</span>
						<el-radio-group v-model="form.onepieceforshipping" class="ml-4">
							<el-radio :label="true">是</el-radio>
							<el-radio :label="false">否</el-radio>
						</el-radio-group>
					</div>
					<el-select
						v-model="form.transportationMethod"
						class="m-2"
						placeholder="请选择运输方式"
						style="width: 200px"
					>
						<el-option
							v-for="item in TransportationList"
							:key="item.id"
							:label="item.name"
							:value="item.name"
						/>
					</el-select>
					<el-form label-position="top">
						<el-form-item label="售价">
							<el-input v-model="form.money" placeholder="请输入售价" />
						</el-form-item>
						<el-form-item label="费比佣金">
							<el-input v-model="form.feeRatio" placeholder="请输入费比佣金" />
						</el-form-item>
					</el-form>
					<el-button type="primary" @click="submit">查询</el-button>
				</div>
			</el-aside>
			<el-main>
				<el-card>
					
				</el-card>
			</el-main>
		</el-container>
	</div>
</template>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
	width: 180px;
}
:deep(.el-form-item) {
	margin-bottom: 8px;
}
:deep(.el-form-item__label) {
	font-size: 12px;
	margin-bottom: 4px !important;
	line-height: 12px !important;
}
.index {
	display: flex;
	height: 90vh;
	width: 90vw;
	.left {
		display: flex;
		flex-direction: column;
		gap: 10px;
		.one {
			padding: 3px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
}
</style>
