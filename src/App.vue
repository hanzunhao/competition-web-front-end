<template>
  <!-- 
        主应用组件（App.vue）
        该组件是整个应用的入口组件，包含一个 `<router-view>` 作为路由的占位符。
        根据当前路由的状态，显示不同的视图内容。
    -->
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>
