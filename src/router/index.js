import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
    { path: '/', name: 'home', component: Home },
    { 
        path: '/film',
         name: 'film', 
         component: ()=> import('../views/filmShow.vue')
    },
    { 
        path: '/serie', 
        name: 'serie', 
        component: ()=> import('../views/serieShow.vue') 
    },
    { 
        path: '/details/:type/:id/:slug', 
        name:'details.show',
        component: () => import('../views/detailsShow.vue'),
        props: route => ({id: parseInt(route.params.id),slug: route.params.slug , type:route.params.type}),
    },
    { 
        path: '/catalogo/:type', 
        name:'catalogoAll.show',
        component: () => import('../views/catalogoShowAll.vue'),
        props: route => ({type:route.params.type})
    },
    { 
        path: '/search', 
        name:'search.show',
        component: () => import('../views/catalogoSearch.vue')
    },
    { 
        path: '/catalogo/:type/:genere', 
        name:'catalogo.show',
        component: () => import('../views/catalogoShow.vue'),
        props: route => ({type:route.params.type,genere:route.params.genere})
    },
   
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
