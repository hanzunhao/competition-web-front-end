<template>
    <MainLayout>
        <div class="dashboard-container">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :lg="6" v-for="(card, index) in cards" :key="index">
                    <el-card shadow="hover" class="dashboard-card" @click="handleCardClick(card.routeName)">
                        <div class="card-content">
                            <el-icon :size="30" class="card-icon">
                                <component :is="card.icon" />
                            </el-icon>
                            <div class="card-title">{{ card.title }}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layout/MainLayout.vue';
import { useRouter } from 'vue-router';
import { Files, Notebook, ChatLineSquare, DataLine } from '@element-plus/icons-vue';

const router = useRouter();

const cards = [
    { title: '温室数据', icon: Files, routeName: 'Page_1' },
    { title: '任务与日志', icon: Notebook, routeName: 'Page_2' },
    { title: '智能病虫害问答', icon: ChatLineSquare, routeName: 'Page_3' },
    { title: '花卉价格预测', icon: DataLine, routeName: 'Page_4' }
];

const handleCardClick = (routeName) => {
    router.push({ name: routeName });
};
</script>

<style scoped>
.dashboard-container {
    padding: 20px;
}

.dashboard-card {
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dashboard-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.card-icon {
    margin-bottom: 10px;
    color: var(--el-color-primary);
}

.card-title {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
}
</style>