<script setup>
import { onMounted, ref, defineProps } from "vue";
const props = defineProps(["optionName", "list"]);
const dialogVisible = ref(false);
</script>

<template>
	<div class="product-select">
		<el-button @click="dialogVisible = true" plain style="width: 100%">
			{{ optionName }}
		</el-button>
		<el-dialog :title="optionName" v-model="dialogVisible">
			<el-table :data="list" max-height="400">
				<el-table-column prop="name" label="商品" />
				<el-table-column label="数量">
					<template #default="{ row }">
						<el-input-number v-model="row.num" size="small" :min="0" @change="handleChange" />
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
