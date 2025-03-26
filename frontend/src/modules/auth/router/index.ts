import type { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../layout/AuthLayout.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';

export const authRoutes: RouteRecordRaw = {
            path: '/auth',
            redirect: {name: 'login'},
            component: AuthLayout,
    
            children:[
                {
                    path:'/login',
                    name: 'login',
                    component: LoginPage
                },
                {
                    path: '/register',
                    name: 'register',
                    component: RegisterPage
                }
            ]
}