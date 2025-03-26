<template>
    <div class="w-100 d-flex justify-content-center align-item-center z-3 position-absolute"  id="container-alert">
        <div class="alert alert-danger notification-failure d-flex justify-content-center align-items-center w-75 h-50" role="alert">
        <div>
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <span>{{ alerta?.message }}</span> 
        </div>
    </div>
</div>
</template>
 <script lang="ts" setup>
import type { IAlert } from '../interfaces/IAlert';
interface Props{
    alerta:IAlert|null;
}

defineProps<Props>();
// Los passwords no coinciden, verifica nuevamente.
</script>