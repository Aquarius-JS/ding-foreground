<script setup>
import { onMounted, ref, computed } from "vue";
import { ForegroundAPI } from "@/apis";
const ProductList = ref([]);
const DepartmentList = ref([]);
const PlatFormList = ref([]);
const TransportationList = ref([]);
const init = async () => {
	let res = await ForegroundAPI.getProduct();
	ProductList.value = res.data;
	res = await ForegroundAPI.getDepartment();
	DepartmentList.value = res.data;
	res = await ForegroundAPI.getPlatforms();
	PlatFormList.value = res.data;
	res = await ForegroundAPI.getTransportations();
	TransportationList.value = res.data;
};
const comProList = computed(() => {
	return ProductList.value.map(item => ({
		label: item.name,
		value: { ...item }
	}));
});
const comGiftProList = computed(() => {
	return ProductList.value.map(item => ({
		label: item.name,
		value: { ...item }
	}));
});
const form = ref({
	product: [],
	giftProduct: [],
	department: "",
	platform: "",
	onepieceforshipping: false,
	transportationMethod: ""
});
const submit = async () => {
	let res = await ForegroundAPI.submit(form.value);
	console.log(res);
};
onMounted(async () => {
	init();
});
</script>

<template>
	<div class="index">
		<el-container>
			<el-aside width="200px">
				<div class="left">
					<el-select-v2
						v-model="form.product"
						:options="comProList"
						value-key="name"
						placeholder="请选择至少一个产品"
						style="width: 200px"
						:max-collapse-tags="10"
						clearable
						filterable
						multiple
					/>
					<el-select-v2
						v-model="form.giftProduct"
						:options="comGiftProList"
						value-key="name"
						placeholder="请选择增品"
						style="width: 200px"
						:max-collapse-tags="10"
						clearable
						filterable
						multiple
					/>
					<el-select
						v-model="form.department"
						class="m-2"
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
					<el-button type="primary" @click="submit">查询</el-button>
				</div>
			</el-aside>
			<el-main>Main</el-main>
		</el-container>
	</div>
</template>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
	width: 180px;
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
