<template>
    <div id="nav">
        <AppLink to='/'>Home</AppLink>
        <AppLink to='/film'>{{lingua.film}}</AppLink>
        <AppLink to='/serie'>{{ lingua.serieTv }}</AppLink>
        <AppLink :to="{ name: 'catalogoAll.show', params: { type: 'movie' } }">{{lingua.catalogo}}</AppLink>
        <!-- <button class="hamburger"></button> -->
    </div>
</template>

<script>
import AppLink from './AppLink.vue';
import dataStore from '../data/data';
import data from '../lingua.json'
import Search from './search.vue';
export default {
    components: { AppLink ,Search},
    computed:{
        lingua(){
            if(dataStore.lingua == "it-IT")
            return data.languages[1]
            return data.languages[0]
        }
    }
}
</script>

<style>
#nav {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #03DDBD;
    border-radius: 35px;
    padding: 10px 20px;
    z-index: 1000;
    display: flex;
    justify-content: center;  /* Centra gli elementi orizzontalmente */
    align-items: center;      /* Centra gli elementi verticalmente */
    box-shadow: -1px -1px 9px 0.1px #0D1940, 
                1px -1px 9px 0.1px #0D1940, 
                -1px 1px 9px 0.1px #0D1940, 
                 1px 1px 9px 0.1px #0D1940;
}

#nav a {
    display: inline-block; 
    margin-right: 10px;
    color: black;
    opacity: 0.7;
    transition: 0.2s ease color;
}

#nav a.router-link-active,
#nav a:hover {
    opacity: 1;
    font-weight: bold;
}

#logo {
    font-weight: bold;
    font-size: 1vh;
    opacity: 1 !important;
}

a {
    text-decoration: none;
    font-weight: bold;
}
@media (max-width: 768px) {
    #nav a {

    margin-right: 5px;
    font-size:2.2vh

}
}
</style>
