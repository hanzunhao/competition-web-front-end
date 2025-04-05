<template>
    <el-card shadow="hover" class="store-card">
        <template #header>
            <div class="card-header">
                <span>仓库ID: {{ store.id }}</span>
                <div>
                    <el-tag type="success" class="mr-2">容量: {{ store.capacity }}</el-tag>
                    <el-button size="small" type="primary" @click="refreshStore" :loading="loading">
                        刷新数据
                    </el-button>
                </div>
            </div>
        </template>

        <el-descriptions border :column="2">
            <el-descriptions-item label="花卉总数">
                <el-tag type="info">{{ store.totalFlowerNumber }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="总售价">
                <el-text type="danger">¥{{ store.totalSellingPrice.toFixed(2) }}</el-text>
            </el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <el-table :data="flowerData" v-loading="loading" style="width: 100%" height="250">
            <el-table-column prop="name" label="花卉名称" width="100" fixed />
            <el-table-column prop="number" label="数量" width="100" sortable>
                <template #default="{ row }">
                    <el-tag :type="row.number > 50 ? 'success' : 'warning'">
                        {{ row.number }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" sortable>
                <template #default="{ row }">
                    ¥{{ row.price.toFixed(2) }}
                </template>
            </el-table-column>
            <el-table-column label="小计" sortable :sort-method="sortSubtotal">
                <template #default="{ row }">
                    <el-text type="primary">¥{{ (row.number * row.price).toFixed(2) }}</el-text>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { StoreStore } from '../stores/StoreStore';

const props = defineProps({
    storeId: {
        type: Number,
        required: true
    }
});

const sortSubtotal = (a, b) => {
    const subtotalA = a.number * a.price;
    const subtotalB = b.number * b.price;
    return subtotalA - subtotalB;
};

const storeStore = StoreStore();
const loading = ref(false);

onMounted(async () => {
    await storeStore.getAllStore();
})

// 获取当前仓库数据
const store = computed(() => {
    return (storeStore.list || []).find(item => item.id === props.storeId) || {};
});

// 转换花卉数据格式
const flowerData = computed(() => {
    if (!store.value.flowerNames) return [];
    return store.value.flowerNames.map((name, index) => ({
        name,
        number: store.value.flowerNumbers?.[index] || 0,
        price: store.value.flowerSellingPrices?.[index] || 0
    }));
});

// 刷新单个仓库数据
const refreshStore = async () => {
    try {
        loading.value = true;
        await storeStore.getStoreById(props.storeId);
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.store-card {
    margin-bottom: 20px;
    transition: all 0.3s;
}

.store-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mr-2 {
    margin-right: 8px;
}

:deep(.el-descriptions__body) {
    background-color: #fafafa;
}
</style>