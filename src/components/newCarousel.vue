<template>
    <h2 v-if="controlloGenere">{{ genere.name }}</h2>

    <!-- Applichiamo v-lazy per caricare il carousel solo quando visibile -->
    <swiper v-if="controlloGenere" :slidesPerView="5" :spaceBetween="10" :loop="shouldLoop" :navigation="true"
        :modules="modules" :breakpoints="{
            320: { slidesPerView: 1, spaceBetween: 10 },  // Smartphone
            640: { slidesPerView: 2, spaceBetween: 15 },  // Tablet
            1024: { slidesPerView: 3, spaceBetween: 20 }, // Desktop
            1440: { slidesPerView: 5, spaceBetween: 10 }, // Schermi grandi
        }" class="mySwiper" id="swiper">

        <swiper-slide v-for="(element, index) in shuffledArray" :key="index">
            <AppLink
                :to="{ name: 'details.show', params: { id: element.id, slug: element.title || element.name, type: type } }">
                <Card :oggetto="element" />
            </AppLink>
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Controller } from 'swiper/modules';
import Card from './Card.vue';
import AppLink from './AppLink.vue';

import { dataStore } from '../data/data';

export default {
    components: {
        Swiper,
        SwiperSlide,
        Card,
        AppLink
    },
    props: {
        type: { type: String, required: true },
        idGenere: { type: Number, required: true }
    },
    setup() {
        return {
            modules: [Pagination, Navigation, Controller],
            dataStore
        };
    },
    computed: {
        genere() {
            return this.type === 'movie'
                ? dataStore.generiFilm.find(genere => genere.id === this.idGenere)
                : dataStore.generiSerie.find(genere => genere.id === this.idGenere);
        },
        arrayGiusto() {
            return this.type === 'movie'
                ? dataStore.dataFilm.filter(film => film.genre_ids.includes(this.idGenere))
                : dataStore.dataSerie.filter(serie => serie.genre_ids.includes(this.idGenere));
        },
        shuffledArray() {
            return [...this.arrayGiusto].sort(() => Math.random() - 0.5).slice(0, 8);
        },
        controlloGenere() {
            return this.arrayGiusto.length > 5;
        },
        shouldLoop() {
            return this.controlloGenere; // Usa direttamente `controlloGenere`
        }
    }
};
</script>

<style>
#swiper {
    width: 95%;
    overflow: hidden;
    padding-left: 0.5%;
    padding-right: 0.56%;
    padding-top: 0.5%;
}

h2 {
    text-align: left;
    width: 100%;
    margin-left: 3%;
    margin-bottom: 0;
    margin-top: 0;
    padding: 0;
    font-size: 4vh;
    color: #03DDBD;
}

.swiper-slide {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease, z-index 0.3s ease;
}

.swiper-slide .overlay {
    transition: transform 0.3s ease, z-index 0.3s ease;
}

.swiper-slide-active {
    z-index: 2;
}

.swiper-slide:hover {
    z-index: 3;
    transform: scale(1.058);
}

.swiper-slide:hover .overlay {
    transform: scale(1.06);
}
</style>
