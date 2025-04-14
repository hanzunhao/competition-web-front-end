<template>
  <el-drawer v-model="visibleStore.taskDrawerVisible" direction="rtl" size="53%" :before-close="handleClose">
    <el-row class="drawer-container">

      <el-tabs v-model="activeTab" tab-position="top" class="tabs-container">

        <el-tab-pane v-for="day in days" :key="day" :label="day" :name="day">
          <el-input-tag v-model="tasks[day]" @remove-tag="(removedTag, tags) => deleteTask(removedTag, day)"/>
        </el-tab-pane>
      </el-tabs>

      <div class="selection-container">

        <div class="tag-list">
          <el-tag v-for="name in availableTags" :key="name" :type="tagTypes[name]" @click="selectTag(name)">
            {{ name }}
          </el-tag>
        </div>

        <div class="time-picker">
          <el-time-picker v-model="selectedTime" format="HH:mm" placeholder="选择时间" />
        </div>

      </div>

    </el-row>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { TimeLineStore } from '../stores/TimeLineStore';
import { VisibleStore } from '../stores/VisibleStore';
import { ElMessage } from 'element-plus';
import api from '../api';

const visibleStore = VisibleStore();
const timeLineStore = TimeLineStore();

const tasks = timeLineStore.list;
const days = Object.keys(tasks);
const activeTab = ref(days[0]);

const availableTags = ['浇水', '识别病虫害', '更新花盆土壤温湿度'];
const tagTypes = {
  '浇水': 'primary',
  '识别病虫害': 'danger',
  '更新花盆土壤温湿度': 'success'
};

const dayToIntegerDict={
  "Mon":1,
  "Tue":2,
  "Wed":3,
  "Thu":4,
  "Fri":5,
  "Sat":6,
  "Sun":7
}

const selectedTime = ref('');

const selectTag =async (name) => {
  if (tasks[activeTab.value].length < 5 && selectedTime.value) {
    const startTime = selectedTime.value.toString().slice(16, 21)+":00"; // 格式化为 HH:mm
    await api.TaskAPI.insertTask(name,dayToIntegerDict[activeTab.value],startTime);
    tasks[activeTab.value].push({task: name, startTime: startTime});
  } else if (!selectedTime.value) {
    ElMessage({ message: '请先选择时间', type: 'warning' });
  } else {
    ElMessage({ message: '每个输入框最多只能添加 5 个标签', type: 'warning' });
  }
};

const deleteTask = async (removedTag,day) => {
  try {
    await api.TaskAPI.deleteTask(removedTag.task,dayToIntegerDict[day],removedTag.startTime);
    ElMessage({ message: '任务删除成功', type: 'success' });
  } catch (error) {
    console.error(' 删除任务失败:', error);
    ElMessage({ message: '删除任务失败', type: 'error' });
  }
};

const handleClose = () => {
  visibleStore.taskDrawerVisible = false;
};
</script>

<style scoped>
.drawer-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tabs-container {
  height: 15%;
}

.tag-list {
  height: 20%;
  padding: 16px;
  border: 1px solid #ebeef5;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  overflow-y: auto;
}
</style>