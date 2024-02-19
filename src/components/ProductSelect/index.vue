<script setup>
import { onMounted, ref, defineProps } from "vue";
const props = defineProps(["optionName", "list"]);
const dialogVisible = ref(false);
const filterName = ref("");

const rowStyle = ({ row }) => {
	if (filterName.value === "") return "";
	if (!row.name?.includes(filterName.value)) return "display: none";
};
const rowClassName = row => {
	if (filterName.value === "") return "";
	if (!row.name?.includes(filterName.value)) return "hide-row";
};
</script>

<template>
	<div class="product-select">
		<el-button @click="dialogVisible = true" plain style="width: 100%">
			{{ optionName }}
		</el-button>
		<el-dialog :title="optionName" v-model="dialogVisible">
			<div style="width: 200px">
				<el-input placeholder="名称搜索" v-model="filterName" clearable />
			</div>
			<el-table
				height="400"
				:data="list"
				max-height="400"
				table-layout="fixed"
				:row-style="rowStyle"
				:row-class-name="rowClassName"
			>
				<el-table-column prop="name" label="商品" />
				<el-table-column label="数量">
					<template #default="{ row }">
						<el-input-number v-model="row.num" size="small" :min="0" />
					</template>
				</el-table-column>
			</el-table>
			<template #footer>
				<el-button @click="dialogVisible = false"> 确认 </el-button>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss">
.hide-row {
	display: none;
}
</style>
