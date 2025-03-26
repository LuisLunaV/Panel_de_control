<template>
<div class="card-body">
          
          <div class="text-center m-4">
          <h3 class="fuente-tittle">
         <i class="bi bi-person-fill-add"></i>
            Registrate
            </h3>
            <hr>
          </div>

          <form class="form-registro" v-on:submit.prevent="onRegister" >
          
            <div class="mb-3">
              <input
                type="text"
                name="User_Name"
                class="form-control"
                id="nombreCompleto"
                v-model="formData.User_Name"
                placeholder="Nombre completo"
                required
              />
            </div>

            <div class="mb-3">
              <input
                type="email"
                name="User_Email"
                class="form-control"
                id="email"
                ref="emailRef"
                v-model="formData.User_Email"
                placeholder="Correo electronico"
                required                
              />
              <div id="emailHelp" class="form-text">
                <p class="fuente-tittle">
                Nunca compartiremos tu correo electrónico con nadie más.
                </p>
              </div>
            </div>
            <div class="mb-3">
              <input
                type="password"
                name="User_Password"
                class="form-control"
                ref="passswordRef"
                v-model="formData.User_Password"
                minlength="10"
                placeholder="Password"
                required
              />
            <div id="emailHelp" class="form-text">
              <p class="fuente-tittle">
               Mínimo 10 caracteres, intercala letras, números y signos
              </p>
              </div>
            </div>
              <div class="mb-3">
              <input
                type="password"
                name="Password_dos"
                class="form-control"
                v-model="formData.User_PasswordDos"
                minlength="10"
                placeholder="Repite Password"
                required
              />
              <div id="emailHelp" class="form-text">
                <p class="fuente-tittle">
                Ayudanos a validar que tu contraseña sea correcta.
                </p>
              </div>
            </div>

            <div class="d-grid gap-2 text-center">
              <button 
              id="btn-registro" 
              type="submit" 
              class="btn btn-outline-warning"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
        <div class="card-footer text-center text-muted">
            <RouterLink :to="{name:'login'}">Regresar</RouterLink>
        </div>
</template>

<script lang="ts" setup>
import { reactive , ref} from 'vue';
import { useRouter } from 'vue-router';
import type { IAlert } from '../interfaces/IAlert';

const router = useRouter();

const emailRef =     ref<HTMLInputElement | null>( null );
const passswordRef = ref< HTMLInputElement |null>( null );
const sendTimeAlert = ref<number|null>(null);
const alertActive = ref<boolean>(false)
const formData = reactive({
  User_Name:'',
  User_Email:'',
  User_Password:'',
  User_PasswordDos:''
});

//Declaramos el emit
const emit = defineEmits<{
  sendAlert:[alert: IAlert]
}>();

const validarPassword=()=>{
  return formData.User_Password === formData.User_PasswordDos;
}

const handleAlert=()=>{
  
  if( sendTimeAlert.value )clearTimeout( sendTimeAlert.value );

  if( !validarPassword() ){
    alertActive.value = true;
    formData.User_Password = '';
    formData.User_PasswordDos = '';

    //Enviamos el mensaje de error si los passeord no coinciden
  emit('sendAlert', { message:'Los password no coinciden', status:true} );

  //Limpiamos el mensaje
  sendTimeAlert.value = setTimeout(()=>{
    emit('sendAlert', { message:'', status:false } );
  },6000);
  return;
  }
  alertActive.value = false;

}

const onRegister=()=>{
handleAlert(); //Esta es la funcion que envia el emit, lo disparamos desde aqui para no ser redundante

if(alertActive.value)return;

router.replace({name:'login'});
formData.User_Email = '';
formData.User_Name ='';
formData.User_Password = '';
formData.User_PasswordDos = '';
}


</script>