<template>
  <div
    :class="{ ocultar: ocultamos }"
    class="transicion border border-danger bg-danger mb-2 mt-2 rounded-1"
  >
    <p class="fw-medium text-light m-1 ps-1">{{ message }}</p>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const ocultamos = ref<boolean>(false);
let timeOutOcultar: number | null = null;
interface Props {
  message?: string;
}

defineProps<Props>();

onMounted(() => {
  timeOutOcultar = setTimeout(() => {
    ocultamos.value = true;
  }, 5000);
});
onUnmounted(() => {
  if (timeOutOcultar) clearTimeout(timeOutOcultar);
});
</script>

<style scoped>
.transicion {
  transition: opacity 0.5s ease-in-out;
}
.ocultar {
  opacity: 0;
}
</style>
