<template>
  <div class="app">
    <header>
      <h1>Task Manager</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// App.vue setup script
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
header {
  margin-bottom: 20px;
}
h1 {
  color: #333;
}
</style> 