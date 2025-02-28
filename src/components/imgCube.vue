<template>
    <swiper id="swiperCube" :effect="'cube'" :grabCursor="true" :loop="true" :cubeEffect="{
        shadow: true,
        slideShadows: true,
        shadowOffset: 40,
        shadowScale: 2,
        
    }":autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }" :pagination="false" :modules="modules" class="mySwiper">
        <swiper-slide id="swiperSlideCube" v-for="element in array ">
                <img :src="`https://image.tmdb.org/t/p/original${element.poster_path}`" />
        </swiper-slide>
               
    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import {dataStore} from '../data/data';
// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-cube';
import 'swiper/css/pagination';



// import required modules
import {Autoplay, EffectCube, Pagination } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props:{
        type: { type: String, required: true },
    },
    computed:{
        array(){
            if(this.type=='movie'){
                return dataStore.dataFilm.slice(0,10)
            }
            else{
                return dataStore.dataSerie.slice(0,10)
            }
        },
        /* array(){
            
            return this.bestPopularityFilm.concat(this.bestPopularitySerie) 
        }, */
        srce(element){
            return `https://image.tmdb.org/t/p/original${element.backdrop_path}`
        }
        ,
        bestPopularityFilm(){
            let sort = dataStore.dataFIlm.sort((a, b) => b.poularity - a.popularity)
            return sort.slice(0,5)
        },
        bestPopularitySerie(){
            let sort = dataStore.dataSerie.sort((a, b) => b.poularity - a.popularity)
            return sort.slice(0,5)
        },

    },
    setup() {
        return {
            modules: [EffectCube, Pagination,Autoplay],
            dataStore
        };
    },
    
};
</script>
<style>
#swiperCube{
    width: 300px;
    height: auto; 
}
#swiperSlideCube{

    background-position: center;
    background-size: cover;
}
#swiperSlideCube img {
    display: block;
    width: 100%;
    object-fit:cover;
    border-radius:0 !important;
} 

</style>