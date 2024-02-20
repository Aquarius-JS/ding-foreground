<script setup>
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps(["optionName", "list"]);
const emits = defineEmits(["addSpecial", "delSpecial"]);
const dialogVisible = ref(false);
</script>

<template>
	<div class="product-select">
		<el-button @click="dialogVisible = true" plain style="width: 100%">
			{{ optionName }}
		</el-button>
		<el-dialog :title="optionName" v-model="dialogVisible">
			<el-button class="mt-4" style="width: 100%" @click="emits('addSpecial')">添加商品</el-button>
			<el-table :data="list" max-height="400" min-height="400" height="400">
				<el-table-column label="名称">
					<template #default="{ row }">
						<el-input v-model="row.name" placeholder="请输入商品名称" />
					</template>
				</el-table-column>
				<el-table-column label="数量">
					<template #default="{ row }">
						<el-input-number v-model="row.num" size="small" :min="0" />
					</template>
				</el-table-column>
				<el-table-column label="金额(￥)">
					<template #default="{ row }">
						<el-input-number v-model="row.cost" :precision="2" size="small" :min="0" />
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template #default="{ row }">
						<el-button type="danger" size="small" @click="emits('delSpecial', row.name)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<template #footer>
				<el-button @click="dialogVisible = false"> 确认 </el-button>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
