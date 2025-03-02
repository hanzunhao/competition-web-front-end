<template>
    <el-row>
        <el-col>
             <el-text size="large">识别结果：</el-text>
        </el-col>
    </el-row>
    <el-row>
        <el-col> <el-input v-model="textarea" autosize type="textarea" /></el-col>
    </el-row>
</template>

<script setup>
import { ref } from 'vue'
const textarea = ref('')
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.el-text {
    font-size: 20px;
}
</style>