<template>
  <div class="card-body">
    <div class="text-center m-4">
      <h3 class="fuente-tittle"><i class="bi bi-person-circle"></i> Login</h3>
      <hr />
    </div>

    <form class="form-login" v-on:submit.prevent="onLogin">
      <div class="mb-3 row">
        <div class="w-100">
          <input
            type="email"
            class="form-control"
            name="User_Email"
            id="inputEmail"
            ref="emailInputRef"
            v-model="formData.User_Email"
            placeholder="Enter Email"
            required
          />
          <ErrorMessage v-if="error?.campo === 'User_Email'" :message="error?.message" />
        </div>
      </div>

      <div class="mb-3 row">
        <div class="w-100">
          <input
            type="password"
            class="form-control"
            name="User_Password"
            id="inputPassword"
            ref="passwordInputRef"
            v-model="formData.User_Password"
            placeholder="Enter Password"
            required
          />

          <ErrorMessage v-if="error?.campo === 'User_Password'" :message="error?.message" />
        </div>
      </div>

      <div class="mb-3 row">
        <div class="d-grid gap-2 text-center">
          <button type="submit" class="btn btn-outline-warning">Login</button>
        </div>
      </div>
    </form>
  </div>
  <div class="card-footer text-muted pb-3 d-grid gap-2 text-center">
    <span class="mt-2 mb-2 fuente-tittle"
      >¿No tienes una cuenta?
      <RouterLink :to="{ name: 'register' }">Registrate</RouterLink>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue';
import { useFetchAuth } from '../composables/useFetchAuth';
import ErrorMessage from '../components/ErrorMessage.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// Referencias a los inputs del formulario (email y contraseña)
const emailInputRef    = ref< HTMLInputElement |null>(null); 
const passwordInputRef = ref< HTMLInputElement |null>(null);

defineEmits(['sendAlert']);

// Datos reactivos del formulario de login
const formData = reactive({
  User_Email: '',
  User_Password: '',
});

const accion: string = 'login';
let timeOutQuitarError: number | null = null;

const { fetchData, authResponse, error, loading } = useFetchAuth();

// Función que maneja el proceso de login
const onLogin = async () => {
  await fetchData(accion, formData);

  // Verifica si la respuesta es de tipo 'login' (login exitoso)
  if (authResponse.value?.type === 'login') {
    formData.User_Email = '';
    formData.User_Password = '';

     // Obtiene la ruta de redirección desde la respuesta
    const ruta = authResponse.value.data.redirect;
    router.replace( ruta );
    return;
  }

 // Manejo de errores en el formulario
 const campo = error.value?.campo; 

// Si el error está relacionado con el email, limpia el campo y enfoca el input
if (campo === 'User_Email') {
  formData[campo] = ''; 
  emailInputRef.value?.focus(); 
}

// Si el error está relacionado con la contraseña, limpia el campo y enfoca el input
if (campo === 'User_Password') {
  formData[campo] = ''; 
  passwordInputRef.value?.focus(); 
}

// Configura un temporizador para limpiar el mensaje de error después de 5.5 segundos
timeOutQuitarError = setTimeout(() => {
  error.value = null; 
}, 5500);
};

// Limpia el temporizador cuando el componente se desmonta
onUnmounted(() => {
if (timeOutQuitarError) clearTimeout(timeOutQuitarError); 
});
</script>