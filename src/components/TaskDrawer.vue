<template>
  <el-drawer v-model="visibleStore.taskDrawerVisible" direction="rtl" size="53%" :before-close="handleClose">
    <el-row class="drawer-container">
      <el-tabs v-model="activeTab" tab-position="top" class="tabs-container">
        <el-tab-pane v-for="day in days" :key="day" :label="day" :name="day">
          <el-input-tag v-model="tags[day]" />
        </el-tab-pane>
      </el-tabs>
      <div class="selection-container">
        <div class="tag-list">
          <el-tag v-for="tag in availableTags" :key="tag" :type="tagTypes[tag]" draggable @click="selectTag(tag)">
            {{ tag }}
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

const visibleStore = VisibleStore();
const timeLineStore = TimeLineStore();

const tags = timeLineStore.taskAndTime;
const days = Object.keys(tags);
const activeTab = ref(days[0]);

const availableTags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'];
const tagTypes = {
  'Tag 1': 'primary',
  'Tag 2': 'success',
  'Tag 3': 'info',
  'Tag 4': 'warning',
  'Tag 5': 'danger',
};

const selectedTime = ref('');

const selectTag = (tag) => {
  if (tags[activeTab.value].length < 5 && selectedTime.value) {
    const time = selectedTime.value.toString().slice(16, 21); // 格式化为 HH:mm
    tags[activeTab.value].push({ tag, time });
  } else if (!selectedTime.value) {
    ElMessage({ message: '请先选择时间', type: 'warning' });
  } else {
    ElMessage({ message: '每个输入框最多只能添加 5 个标签', type: 'warning' });
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
  height: 10%;
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