<template>
    <img id="posterB" :src="srcGiustoBack" alt="poster">
    <div id="box">
        <div id="overlay"></div>
        <img id="poster" :src="srcGiusto" alt="poster">
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
        type: { type: String, required: true } // ✅ Corretta sintassi
    },
    setup(props) {
        const oggetto = ref(null);

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

        // Usa onMounted con async/await per ottenere i dettagli
        onMounted(async () => {
            try {
                console.log(`Fetching details for ${props.type} with ID: ${props.id}`);
                /* oggetto.value = await dataStore.idDettagli(props.type, props.id); */
                oggetto.value = await dataStore.idDettagli(props.type, props.id);
                console.log("Dati ricevuti:", oggetto.value);
            } catch (error) {
                console.error("Errore nel recupero dei dati:", error);
            }
        });
        
        return {
            oggetto,
            votoFormattato,
            srcGiustoBack,
            srcGiusto
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

/* Immagine di sfondo che copre tutto il div */
#background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
    /* Dietro tutto */
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
    /* Sopra lo sfondo, sotto il contenuto */
}

/* Immagine del poster */
#poster {
    width: 20%;
    height: auto;
    display: block;
    position: absolute;
    top: 20%;
    left: 25%;
    z-index: 3;
}

/* Immagine del poster */
#posterB {
    width: 100%;
    height: 100%;
    height: auto;
    display: block;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 1;
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
</style>
