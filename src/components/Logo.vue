<template>
  <div class="logo-container">
    <div class="icon-container"></div>
    <div class="text-container">
      <!-- 中文标题 - 使用更大的字号和更粗的字体 -->
      <div class="cn-title">
        花慧
      </div>

      <!-- 中文副标题 - 中等字号 -->
      <div class="cn-subtitle">
        助力花卉基地养护与管理的AIoT平台
      </div>

      <el-divider class="custom-divider" />

      <!-- 英文 - 使用等宽或非衬线字体 -->
      <div class="en-text">
        FloriWisdom - AIoT Platform for Horticultural Base Maintenance
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础容器样式保持不变 */
.logo-container {
  margin-left: 5px;
  margin-right: auto;
  margin-top: 5px;
  margin-bottom: auto;
  height: 140px;
  width: 440px;
  display: flex;
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

.icon-container {
  background-image: url('../assets/LogoIcon.svg');
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 30%;
}

.text-container {
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  margin-right: 5px;
}

/* 中文标题样式 */
.cn-title {
  font-size: 32px;
  font-weight: 700;
  /* Extra Bold */
  line-height: 1.2;
  color: var(--el-color-primary);
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

/* 中文副标题样式 */
.cn-subtitle {
  font-size: 18px;
  font-weight: 500;
  /* Medium */
  line-height: 1.4;
  color: var(--el-text-color-primary);
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  margin-top: 4px;
}

/* 英文样式 */
.en-text {
  font-size: 15px;
  font-weight: 400;
  /* Regular */
  line-height: 1.3;
  color: var(--el-text-color-secondary);
  font-family: "Segoe UI", "Arial", sans-serif;
  font-style: italic;
  /* 英文可以使用斜体增加设计感 */
  margin-top: 4px;
}

.custom-divider {
  margin: 6px 0 !important;
  border-color: var(--el-border-color) !important;
}
</style>