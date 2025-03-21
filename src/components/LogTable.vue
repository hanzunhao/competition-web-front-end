<template>
    <div style="margin-bottom: 20px">
        <el-button @click="confirmDelete">删除</el-button>
    </div>

    <el-scrollbar style="height: 85%;">
        <el-table ref="multipleTableRef" :data="logStore.formattedList" row-key="id" style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="date" label="日期" width="240" sortable>
                <template #default="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column property="name" label="名称" width="240" />
            <el-table-column property="isCompleted" label="状态" />
        </el-table>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { LogStore } from '../stores/LogStore';
import { JwtStore } from '../stores/jwtStore';
import router from '../router';

interface Log {
    id: number;
    date: string;
    name: string;
    isCompleted: string;
}

const logStore = LogStore();
const jwtStore = JwtStore();
const multipleTableRef = ref();
const multipleSelection = ref<Log[]>([]);

const MESSAGES = {
    NO_SELECTION: '请先选择要删除的记录',
    DELETE_SUCCESS: '删除成功',
    DELETE_CANCELED: '取消删除',
    DELETE_CONFIRM: '确定要删除选中的记录吗？'
};

onMounted(() => {
    if (!jwtStore.jwt) {
        router.push({ name: 'Login' });
    } else {
        logStore.getAllLog();
    }
});

const confirmDelete = () => {
    if (multipleSelection.value.length === 0) {
        ElMessage.warning(MESSAGES.NO_SELECTION);
        return;
    }

    ElMessageBox.confirm(MESSAGES.DELETE_CONFIRM, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        deleteSelectedHistory();
    }).catch(() => {
        ElMessage.info(MESSAGES.DELETE_CANCELED);
    });
};

const deleteSelectedHistory = async () => {
    const selectedIds = multipleSelection.value.map((selected) => selected.id);
    await logStore.deleteLog(selectedIds);
    await logStore.getAllLog();
    multipleTableRef.value!.clearSelection();
    ElMessage.success(MESSAGES.DELETE_SUCCESS);
};

const handleSelectionChange = (val: Log[]) => {
    multipleSelection.value = val;
};
</script>