<template>
    <MainLayout>
        <div class="main-container">
            <el-carousel class="background-carousel" :interval="5000" height="100%" motion-blur>
                <el-carousel-item v-for="(img, index) in carouselImages" :key="index">
                    <div class="carousel-image" :style="{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }"></div>
                </el-carousel-item>
            </el-carousel>

            <div class="logo-container">
                <Logo></Logo>
            </div>

            <div class="centered-cards">
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
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layout/MainLayout.vue';
import { useRouter } from 'vue-router';
import { Files, Notebook, ChatLineSquare, DataLine } from '@element-plus/icons-vue';
import Logo from '../components/Logo.vue';
import carousel1 from '../assets/MainCarouselImage_1.jpg'
import carousel2 from '../assets/MainCarouselImage_2.jpg'
import carousel3 from '../assets/MainCarouselImage_3.jpg'

const carouselImages = [carousel1, carousel2, carousel3]

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
.main-container {
    position: relative;
    /* 为绝对定位子元素提供参考 */
    height: 93%;
    border-radius: 20px;
    padding: 20px;
    overflow: hidden;
}

.background-carousel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.carousel-image {
    width: 100%;
    height: 100%;
    filter: brightness(0.8);
}

.logo-container {
    position: absolute;
    z-index: 10;
}

.centered-cards {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 真正居中 */
    width: auto;
}

.cards-container {
    width: 100%;
    display: flex;
    justify-content: center;
    /* 卡片区域水平居中 */
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
    background-color: rgba(255, 255, 255, 0.7);
    /* 白色70%不透明度 */
    backdrop-filter: blur(5px);
    /* 可选：背景模糊效果 */
    border-radius: 20px;
    /* 可选：圆角效果 */
    padding: 10px;
    /* 可选：内边距 */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /* 可选：轻微阴影提升层次感 */
}

.dashboard-card:hover {
    transform: scale(1.05) translateY(-5px);
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
    padding: 16px;
    font-size: 14px;
    line-height: 1.6;
}
</style>