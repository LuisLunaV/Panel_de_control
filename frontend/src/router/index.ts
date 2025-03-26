import isAuthenticatedGuard from "@/modules/auth/guards/is-authenticated.guard";
import { authRoutes } from "@/modules/auth/router";
import PanelLayout from "@/modules/panel/layout/PanelLayout.vue";
import Inicio from "@/modules/panel/view/Inicio.vue";
import SobreMi from "@/modules/panel/view/SobreMi.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory( import.meta.env.BASE_URL),
    routes:[
       {
        path: '/',
        name:'panel',
        beforeEnter:[
            //el usuario esta autenticado?
            isAuthenticatedGuard
        ],
        component: PanelLayout,
        meta: {requiresAuth: true}, // Marcar ruta como protegida
        children:[
            {
             path: '/',
             name: 'inicio',
             component: Inicio
            },
            {
             path: '/sobre_mi',
             name: 'sobre_mi',
             component: SobreMi
            }
        ]
       },
    // Autenticacion
       authRoutes,
    ]
});