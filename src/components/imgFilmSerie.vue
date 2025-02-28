<template>
    <div id="all">
        <swiper :loop="true" :effect="'coverflow'" :spaceBetween="30" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :coverflowEffect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        }" :pagination="false" :modules="modules" 
        class="mySwiper">
        <swiper-slide v-for="(element,index) in array" :key="index" >
            <CardCarousel :oggetto="element"/>
        </swiper-slide>
        </swiper>
    </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import {dataStore} from '../data/data';


// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import {Autoplay, EffectCoverflow, Pagination , Navigation } from 'swiper/modules';
import CardCarousel from './cardCarousel.vue';
import AppLink from './AppLink.vue';

export default {
    components: {
        Swiper,
        SwiperSlide,
        CardCarousel,
        AppLink
    },
    setup() {
        return {
            modules: [EffectCoverflow, Pagination , Autoplay , Navigation],
            dataStore
        };
    },
    computed:{
        array(){
            return this.bestPopularityFilm.concat(this.bestPopularitySerie) 
        },
        srce(element){
            return `https://image.tmdb.org/t/p/original${element.backdrop_path}`
        }
        ,
        bestPopularityFilm(){
            let sort = dataStore.dataFilm.sort((a, b) => b.popularity - a.popularity)
            return sort.slice(0,5)
        },
        bestPopularitySerie(){
            let sort = dataStore.dataSerie.sort((a, b) => b.popularity - a.popularity)
            return sort.slice(0,5)
        },
    }
};
</script>
<style>
.swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
    width: 700px;
    height: auto;
    border-radius:20px;
}

.swiper-slide img {
    display: block;
    width: 100%;
}
#all{
    margin:0px;
    margin-top:2%;
}
</style>