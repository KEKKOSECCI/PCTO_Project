<template>
    <img id="posterB" :src="isMobile ? srcGiusto : srcGiustoBack" alt="poster">
    <div id="box">
        <div id="overlay"></div>
        <img id="poster" :src="isMobile ? srcGiustoBack : srcGiusto" alt="poster">
        <div id="scritte">
            <h1 id="detailsTitle">
                <span v-if="oggetto && oggetto.title">{{ oggetto.title }}</span>
                <span v-else-if="oggetto && oggetto.name">{{ oggetto.name }}</span>
            </h1>
            <p id="detailsOverview" v-if="oggetto && oggetto.overview">{{ oggetto.overview }}</p>
            <Raiting id="detailsRaiting" :rating="votoFormattato / 2" />
        </div>
    </div>
</template>

<script>
import { dataStore } from '../data/data';
import { computed, onMounted, ref } from 'vue';
import Raiting from './raiting.vue';

export default {
    components: { Raiting },
    props: {
        id: { type: Number, required: true },
        type: { type: String, required: true }
    },
    setup(props) {
        const oggetto = ref(null);
        const isMobile = ref(window.innerWidth <= 768);

        const updateIsMobile = () => {
            isMobile.value = window.innerWidth <= 768;
        };

        window.addEventListener('resize', updateIsMobile);

        const srcGiusto = computed(() => {
            return oggetto.value?.poster_path 
                ? `https://image.tmdb.org/t/p/original${oggetto.value.poster_path}` 
                : '';
        });

        const srcGiustoBack = computed(() => {
            return oggetto.value?.backdrop_path 
                ? `https://image.tmdb.org/t/p/original${oggetto.value.backdrop_path}` 
                : '';
        });

        const votoFormattato = computed(() => {
            return oggetto.value?.vote_average 
                ? oggetto.value.vote_average.toFixed(1) 
                : 0;
        });

        onMounted(async () => {
            try {
                oggetto.value = await dataStore.idDettagli(props.type, props.id);
            } catch (error) {
                console.error("Errore nel recupero dei dati:", error);
            }
        });

        return {
            oggetto,
            votoFormattato,
            srcGiustoBack,
            srcGiusto,
            isMobile
        };
    }
};
</script>

<style>
#box {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

/* Poster di sfondo */
#posterB {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius:0;
}

/* Overlay scuro sopra lo sfondo */
#overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    border-radius:0;
}

/* Poster principale */
#poster {
    width: 20%;
    height: auto;
    display: block;
    position: absolute;
    top: 20%;
    left: 25%;
    z-index: 3;
}

/* Sezione scritte */
#scritte {
    position: absolute;
    top: 20%;
    left: 47%;
    text-align: left;
    color: white;
    z-index: 3;
    height: 65%;
}

#detailsOverview {
    max-width: 60%;
}

#detailsRaiting {
    position: absolute;
    bottom: 0;
    left: 45%;
}

/* 📱 Stile per mobile */
@media (max-width: 768px) {
    #poster {
        width: 100%;
        left: 0;
        top: 0;
        position: absolute;
        object-fit: cover;
        height: 100%;
        z-index:0;
        border-radius:0;
    }

    #posterB {
        width: 40%;
        height: auto;
        left: 50%;
        transform: translateX(-50%);
        top: 10%;
        display:none;
    }

    #scritte {
        top: 20%;
        left: 5%;
        width: 90%;
        text-align: center;
    }

    #detailsOverview {
        font-size: 1.5vh;
        max-width:100%;
       height:60%;
    }

    #detailsRaiting {
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
