<template>
    <el-upload ref="upload" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :limit="1" :on-exceed="handleExceed" :auto-upload="false">
        <template #trigger>
            <el-button>浏览</el-button>
        </template>
        <el-button class="ml-3" type="primary" @click="submitUpload">
            识别
        </el-button>
        <template #tip>
            <div class="el-upload__tip text-red">
                限制1个文件，新文件将覆盖旧文件
            </div>
        </template>
    </el-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const submitUpload = () => {
    upload.value!.submit()
}
</script>

<style scoped>
.el-button {
    margin-left: 20px;
    margin-right: 20px;
}
</style>