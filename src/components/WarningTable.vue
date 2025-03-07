<template>
    <!-- 删除按钮 -->
    <div style="margin-bottom: 20px">
        <el-button @click="confirmDelete">删除</el-button>
    </div>

    <!-- 表格区域，使用 el-scrollbar 实现滚动 -->
    <el-scrollbar style="height: 85%;">
        <!-- el-table 表格组件 -->
        <el-table ref="multipleTableRef" :data="warningHistoryStore.formattedList" row-key="id" style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }" @selection-change="handleSelectionChange">
            <!-- 多选列 -->
            <el-table-column type="selection" width="55" />
            <!-- 日期列，支持排序 -->
            <el-table-column prop="date" label="日期" width="240" sortable>
                <template #default="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <!-- 名称列 -->
            <el-table-column property="name" label="名称" width="240" />
            <!-- 原因列 -->
            <el-table-column property="reason" label="原因" />
        </el-table>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TableInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { WarningHistoryStore } from '../stores/WarningHistoryStore'
import { onMounted } from 'vue'
import { JwtStore } from '../stores/jwtStore'
import router from '../router'

const warningHistoryStore = WarningHistoryStore()

const jwtStore = JwtStore();

// 表格实例引用
const multipleTableRef = ref<TableInstance>()

// 存储选中的行数据
const multipleSelection = ref<Warning[]>([])

// 常量：提示信息
const MESSAGES = {
    NO_SELECTION: '请先选择要删除的记录',
    DELETE_SUCCESS: '删除成功',
    DELETE_CANCELED: '取消删除',
    DELETE_CONFIRM: '确定要删除选中的记录吗？'
}

// 组件挂载时加载数据
onMounted(() => {
    if (!jwtStore.jwt) {
        router.push({ name: 'Login' })
    } else { 
        warningHistoryStore.getAllWarning() 
    }
})

// 确认删除操作
const confirmDelete = () => {
    console.log("ids:", multipleSelection.value.map((selected) => selected.id));


    // 如果没有选中任何行，提示用户
    if (multipleSelection.value.length === 0) {
        ElMessage.warning(MESSAGES.NO_SELECTION)
        return
    }

    // 弹出确认对话框
    ElMessageBox.confirm(MESSAGES.DELETE_CONFIRM, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        // 用户点击确定，执行删除操作
        deleteSelectedHistory()
    }).catch(() => {
        // 用户点击取消，提示取消删除
        ElMessage.info(MESSAGES.DELETE_CANCELED)
    })
}

// 删除选中的历史记录
const deleteSelectedHistory = async () => {

    // 获取选中的记录 ID 数组
    const selectedIds = multipleSelection.value.map((selected) => selected.id);

    // 调用 store 中的 deleteWarning 方法
    await warningHistoryStore.deleteWarning(selectedIds);

    // 删除成功后，重新加载数据
    await warningHistoryStore.getAllWarning();

    // 清空选中状态
    multipleTableRef.value!.clearSelection();

    // 提示删除成功
    ElMessage.success(MESSAGES.DELETE_SUCCESS);

};

// 处理表格行选中状态变化
const handleSelectionChange = (val: Warning[]) => {
    // 更新选中的行数据
    multipleSelection.value = val
}
</script>