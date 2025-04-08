<template>
    <MainLayout>
        <div class="dashboard-container">
            <el-row :gutter="20" justify="center" align="middle" type="flex">
                <el-col :xs="24" :sm="12" :lg="10" v-for="(card, index) in cards" :key="index" justify="center"
                    align="middle" style="width: 100px;">
                    <el-popover class="box-item" :content="card.description" :placement="card.placement"
                        popper-class="custom-popover" width="300">
                        <template #reference>
                            <el-card shadow="hover" class="dashboard-card" @click="handleCardClick(card.routeName)">
                                <div class="card-content">
                                    <el-icon :size="30" class="card-icon">
                                        <component :is="card.icon" />
                                    </el-icon>
                                    <div class="card-title">{{ card.title }}</div>
                                </div>
                            </el-card>
                        </template>
                    </el-popover>
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
    { 
        title: '温室数据', 
        icon: Files, 
        routeName: 'Page_1', 
        description: '实时监测并记录温室内的温度、湿度、光照强度、CO₂浓度等关键环境参数，提供历史数据趋势分析、异常值预警和智能调控建议，帮助维持最适合作物生长的环境条件。系统支持多温室数据对比和自定义阈值设置。',
        placement: 'left-end' 
    },
    { 
        title: '任务与日志', 
        icon: Notebook, 
        routeName: 'Page_2', 
        description: '完整的任务管理系统，包括播种、灌溉、施肥、修剪等全生命周期养护任务规划。支持任务分配、进度跟踪、完成验收和操作日志自动记录，可生成日报/周报并导出PDF。异常操作自动标记，实现全流程可追溯。',
        placement: 'right-end' 
    },
    { 
        title: '智能病虫害问答', 
        icon: ChatLineSquare, 
        routeName: 'Page_3', 
        description: '基于深度学习的植物病虫害识别系统，支持通过上传叶片照片自动诊断30+种常见病害和虫害。提供防治方案推荐、用药指导及生物防治建议。集成农业专家知识库，可进行多轮专业问答，支持防治效果跟踪记录。',
        placement: 'left-start' 
    },
    { 
        title: '花卉价格预测', 
        icon: DataLine, 
        routeName: 'Page_4', 
        description: '整合历史交易数据、市场供需关系、节假日因素等多维度信息，采用时间序列分析和机器学习算法预测未来1-3个月的花卉价格走势。提供库存价值评估、最佳销售时机建议和利润预测功能，支持自定义品种和规格的个性化分析。',
        placement: 'right-start' 
    }
];

const handleCardClick = (routeName) => {
    router.push({ name: routeName });
};
</script>

<style scoped>
.dashboard-container {
    border-radius: 20px;
    background: rgba(247, 242, 242, 0.95);
    padding: 20px;
    height: 93%;
    display: grid;
    place-items: center;
}

.dashboard-card {
    margin: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 120px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dashboard-card:hover {
    transform: scale(1.05);
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

.card-description {
    font-size: 24px;
    color: #666;
    text-align: center;
    line-height: 1.4;
}

:deep(.custom-popover) {
    max-width: 300px;
    /* 最大宽度 */
    padding: 16px;
    /* 内边距 */
    font-size: 14px;
    /* 字体大小 */
    line-height: 1.6;
    /* 行高 */
}
</style>