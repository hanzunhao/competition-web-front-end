<template>
    <el-card shadow="hover">
        <el-descriptions class="margin-top" :column="1" :size="size" border>
            
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        ID
                    </div>
                </template>

                <slot name="id"></slot>

            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        土壤温度
                    </div>
                </template>

                <slot name="soilTemperature"></slot>

            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        土壤湿度
                    </div>
                </template>

                <slot name="soilHumidity"></slot>

            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup>
</script>

<style scoped>
span {
    margin-right: 1%;
}
.el-card{
    border-radius:20px;
    box-shadow: 1px 1px;
}
</style>