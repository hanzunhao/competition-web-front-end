<template>
    <!-- 页面三 -->
    <MainLayout>
        <el-row gutter="20">
            <el-col :span="4">
                <Upload></Upload>
            </el-col>
            <el-divider direction="vertical" />
            <el-col :span="19">
                <TextArea></TextArea>
            </el-col>
        </el-row>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layout/MainLayout.vue'
import Upload from '../components/Upload.vue';
import TextArea from '../components/TextArea.vue';
</script>

<style scoped>
.el-row {
    height: 100%;
    width: 100%;
}

.el-divider {
    height: 100%;
    border-width: 1px;
    border-color: #9a9a9a;
}
</style>