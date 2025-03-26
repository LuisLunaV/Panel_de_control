import type { RouteLocationNormalizedLoadedGeneric, NavigationGuardNext } from 'vue-router';
import { useFetchAuth } from '../composables/useFetchAuth';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalizedLoadedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {

  const requiresAuth = to.matched.some((record) => {
    return record.meta.requiresAuth;
  });
  //Se requiere autenticacion
  if( requiresAuth ){

  const { authResponse, error, fetchData } = useFetchAuth();

  //Enviamos el token almacenado al back para validarlo
   await fetchData('validate-token');

   //Si no hay token o el token no es valido, regresamos al login
   if( error.value) return next( {name: 'login'});
   
   //SI el token almacenado es valido continuamos al panel
   if( authResponse.value) return next();
  
}
};

export default isAuthenticatedGuard;
