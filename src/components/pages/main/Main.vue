<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

onMounted(() => {
  router.replace('/dashboard')
})
</script>

<template>
  <div class="main-page">

  </div>
</template>

<style lang="scss" scoped>

</style>