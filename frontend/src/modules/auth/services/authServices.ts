import authApi from "@/modules/auth/services/api";
import type { ILogin, IRegister } from '../interfaces/IAuth';

const login = async( payload: ILogin )=>{

        const resp = await fetch( `${ authApi }/login`,{
            method: 'POST',
            body: JSON.stringify( payload ),
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include" //-> Enviamos el token en cache
        });
        if( !resp.ok ){
            const error = await resp.json();
            throw error;
        }
        return resp.json();
          

}

const register = async( payload:IRegister )=>{
    const resp = await fetch( `${ authApi }/register`,{
        method: 'POST',
        body: JSON.stringify( payload ),
        headers:{
            "Content-Type": "application/json"
        },
        credentials: "include" //-> Enviamos el token en cache
    });
    if( !resp.ok ){
        const error = await resp.json();
        throw error;
    }
    return resp.json();
}

const isAuthenticated = async()=>{
    const resp = await fetch( `${ authApi }/validate-token`,{
        method: 'GET',
        headers:{
            "Content-Type": "application/json"
        },
        credentials: "include"
        
    });
    
    if( !resp.ok){
        const error = await resp.json();
        throw error;
    }

    return resp.json();
}

export{
    login,
    register,
    isAuthenticated
}