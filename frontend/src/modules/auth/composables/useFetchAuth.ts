import { ref } from "vue"
import { login, isAuthenticated } from "../services/authServices";
import type { ILogin, ILoginResponse, ILoginErrorResponse, IValidateToken } from "../interfaces/IAuth";

// Tipo Discriminado
type AuthResponse = 
| { type: 'login', data: ILoginResponse } 
| { type: 'validateToken', data: IValidateToken };

export const useFetchAuth= ( )=>{

const authResponse = ref<AuthResponse | null>(null);
const error        = ref<ILoginErrorResponse | null >(null);
const loading      = ref<boolean>( true );

const fetchData= async(accion:string,  payload?: ILogin )=>{
    try {
        switch( accion ){
            case 'login':
           const loginData = await login( payload! );
           authResponse.value = { type:'login', data: loginData}
            break;
            case 'register':
            break;
            case 'validate-token':
            const validateToken = await isAuthenticated();
            authResponse.value = { type: 'validateToken', data: validateToken }
            break;
            default:
                console.log('No existe la ruta')
            break;
        }
    } catch (err:any) {
        error.value = err;
    }finally{
        loading.value = false;
    }
}

    return{
        authResponse,
        error,
        loading,
        fetchData
    }
}