<script setup>
import { onMounted, ref, computed } from "vue";
import { cloneDeep, remove } from "lodash";
import { ElMessage } from "element-plus";
import { ForegroundAPI } from "@/apis";
import ProductSelect from "@/components/ProductSelect/index.vue";
import SpecialProduct from "@/components/SpecialProduct/index.vue";
import frontRequest from "../../apis/frontRequest";
const ProductList = ref([]);
const PriceSystem = ref([]);
const DepartmentList = ref([]);
const PlatFormList = ref([]);
const TransportationList = ref([]);
const color = ref("");
const id = ref("");
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
const resultForm = ref();
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
	resultForm.value = null;
	let res = await ForegroundAPI.submit({
		...form.value,
		money: form.value.money * 1,
		feeRatio: form.value.feeRatio * 1,
		onepieceforshipping: form.value.department.includes("分销")
			? form.value.onepieceforshipping
			: undefined
	});
	id.value = res.id;
	console.log(res);
	// 有结果
	if (res.color) {
		color.value = res.color;
		resultForm.value = cloneDeep(form.value);
		resultForm.value.product = resultForm.value.product.filter(item => item.num > 0);
		resultForm.value.specialProduct = resultForm.value.specialProduct.filter(item => item.num > 0);
		resultForm.value.giftProduct = resultForm.value.giftProduct.filter(item => item.num > 0);
	}
};
const saveHandle = async () => {
	let res = await ForegroundAPI.save({ id: id.value });
	if (res) {
		ElMessage({
			type: "success",
			message: "保存成功"
		});
	}
};
const showProduct = product => {
	return product?.length > 0;
};
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
const formInit = () => {
	form.value.product = ProductList.value.map(item => ({
		name: item.name,
		num: 0
	}));
	form.value.giftProduct = ProductList.value.map(item => ({
		name: item.name,
		num: 0
	}));
	form.value.specialProduct = form.value.specialProduct.map(item => ({
		...item,
		cost: 0
	}));
};
onMounted(async () => {
	await init();
	formInit();
});
</script>

<template>
	<div class="index">
		<el-container>
			<el-aside width="200px">
				<div class="left">
					<product-select option-name="商品列表" v-model:list="form.product" />
					<product-select option-name="赠品列表" v-model:list="form.giftProduct" />
					<special-product
						option-name="特殊商品列表"
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
					<div class="one flex items-center text-sm" v-if="form.department.includes('分销')">
						<span>一件代发：</span>
						<el-radio-group v-model="form.onepieceforshipping" class="ml-4">
							<el-radio :label="true">是</el-radio>
							<el-radio :label="false">否</el-radio>
						</el-radio-group>
					</div>
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
				<el-card v-show="!resultForm">
					<el-empty description="暂无查询数据" />
				</el-card>
				<el-card v-show="resultForm">
					<div class="top">
						<div class="left">
							<p>
								<span>{{ resultForm?.priceSystem }}</span> |
								<span>{{ resultForm?.department }}</span> |
								<span v-if="resultForm?.onepieceforshipping">一件代发</span>
								<span>{{ resultForm?.platform }}</span> |
								<span>{{ resultForm?.transportationMethod }}</span>
							</p>
							<p>
								<span>售价：{{ resultForm?.money }} ￥</span> |
								<span>费比佣金：{{ resultForm?.feeRatio * 100 }} %</span>
							</p>
						</div>
						<div class="right">
							<div :class="color" />
							<el-button type="primary" @click="saveHandle">保存</el-button>
						</div>
					</div>
					<div class="product" v-show="showProduct(resultForm?.product)">
						<h3>商品</h3>
						<el-table :data="resultForm?.product" style="width: 100%">
							<el-table-column prop="name" label="名称" width=""> </el-table-column>
							<el-table-column prop="num" label="数量" width=""> </el-table-column>
							<!-- <el-table-column prop="cost" label="金额" width=""> </el-table-column> -->
						</el-table>
					</div>
					<div class="product" v-show="showProduct(resultForm?.specialProduct)">
						<h3>特殊商品</h3>
						<el-table :data="resultForm?.specialProduct" style="width: 100%">
							<el-table-column prop="name" label="名称" width=""> </el-table-column>
							<el-table-column prop="num" label="数量" width=""> </el-table-column>
							<el-table-column prop="cost" label="金额(￥)" width=""> </el-table-column>
						</el-table>
					</div>
					<div class="product" v-show="showProduct(resultForm?.giftProduct)">
						<h3>赠品</h3>
						<el-table :data="resultForm?.giftProduct" style="width: 100%">
							<el-table-column prop="name" label="名称" width=""> </el-table-column>
							<el-table-column prop="num" label="数量" width=""> </el-table-column>
							<!-- <el-table-column prop="cost" label="金额" width=""> </el-table-column> -->
						</el-table>
					</div>
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
	box-sizing: border-box;
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
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
		}
		.right {
			display: flex;
			gap: 20px;
		}
	}
	.product {
		margin-top: 20px;
	}
}
</style>
