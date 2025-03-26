<template>

<Alerts :class="{ ocultar: !isActive, mostrar: isActive }" :alerta="mensaje"/>
<div class="negro-mate size-container">
<div class="container d-flex justify-content-center pt-5">
  <div class="row w-100 d-flex justify-content-center">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4">
      <br />
      <div class="card negro-mate border-yellow mb-3">
        <RouterView @send-alert="atraparAlerta" />
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { IAlert } from '../interfaces/IAlert';
import Alerts from '../components/Alerts.vue';


const isActive = ref(false);
const mensaje  = ref<IAlert|null>(null);
const setTimeStatus = ref<number|null>(null);

// Función que se ejecuta cuando el hijo emite 'send-alert'
const atraparAlerta = (alert: IAlert) => {

//Limpiamos el temporizador
if(setTimeStatus.value)clearTimeout( setTimeStatus.value );
 
  mensaje.value = alert;
  isActive.value = mensaje.value.status;
  
  //Ocultanos el mensaje de alerta
 setTimeStatus.value = setTimeout(()=>{
    isActive.value = false;
  },5000)
};
</script>

<style scope>
.mostrar{
  transform: translateY(0%);  
  opacity: 1; 
  transition: all 500ms ease;
}

.ocultar{
  height: 15%;  
  transform: translateY(-15%);  
  opacity: 0; 
  transition: all 500ms ease;
}

</style>