<template>
    <el-card shadow="hover">
        <template #header>
            <span>
                <el-tag type="primary" round>
                    <slot name="id"></slot>
                </el-tag>
            </span>
            <slot name="flower"></slot>
        </template>
        <el-descriptions :column="1" :size="size" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Sunny />
                        </el-icon>
                        气温
                    </div>
                </template>
                <slot name="temperature"></slot>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Pouring />
                        </el-icon>
                        空气湿度
                    </div>
                </template>
                <slot name="wetness"></slot>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Warning />
                        </el-icon>
                        病虫害
                    </div>
                </template>
                <slot name="pest"></slot>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup>
</script>

<style scoped>
span {
    margin-right: 2%;
}

.el-card {
    border-radius: 20px;
    box-shadow: 1px 1px;
}

.el-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>