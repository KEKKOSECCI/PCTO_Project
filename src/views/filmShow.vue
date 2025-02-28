<template>
    <ImgCube :type="'movie'" class="img-Cube"/>
    <div class="superContainer">
        <!-- Carica solo i generi visibili inizialmente e quelli caricati tramite scroll -->
        <NewCarousel v-for="genere in loadedGenres" :key="genere.id" :idGenere="genere.id" :type="'movie'" />
        
        <!-- Messaggio di caricamento -->
        <div v-if="loading" class="loading-text">Caricamento...</div>
    </div>
</template>

<script>
import { dataStore } from '../data/data';
import ImgFilmSerie from '../components/imgFilmSerie.vue';
import NewCarousel from '../components/newCarousel.vue';
import ImgCube from '../components/imgCube.vue';

export default {
    components: {
        ImgFilmSerie,
        NewCarousel,
        ImgCube
    },
    data() {
        return {
            films: dataStore.dataFilm,
            arrayGenere: dataStore.generiFilm,   // Tutti i generi disponibili
            loadedGenres: [],                    // I generi che sono stati caricati
            loading: false,                      // Stato di caricamento
            currentIndex: 0                      // Indice dell'array di generi da caricare
        };
    },
    computed: {
        // Controlla se ci sono ancora generi da caricare
        canLoadMore() {
            return this.currentIndex < this.arrayGenere.length;
        }
    },
    methods: {
        // Funzione per caricare più generi quando si scorre
        loadMore() {
            if (this.loading || !this.canLoadMore) return;
            this.loading = true;
            
            setTimeout(() => {
                // Carica i prossimi 2 generi
                const nextGenres = this.arrayGenere.slice(this.currentIndex, this.currentIndex + 3);
                this.loadedGenres.push(...nextGenres);  // Aggiungi i nuovi generi caricati
                this.currentIndex += 3;  // Avanza l'indice per il prossimo caricamento
                this.loading = false;
            }, 1000);  // Ritardo simulato per il caricamento
        },

        // Funzione per gestire lo scroll della pagina
        handleScroll() {
            const scrollPosition = window.scrollY + window.innerHeight; // Posizione dello scroll della finestra
            const documentHeight = document.documentElement.scrollHeight; // Altezza totale del documento

            if (scrollPosition >= documentHeight - 500 && !this.loading) {
                // Quando la pagina è quasi alla fine, carica più generi
                this.loadMore();
            }
        }
    },
    mounted() {
        // Carica i primi 2 generi all'inizio
        this.loadMore();

        // Aggiungi l'evento di scroll alla finestra
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        // Rimuovi l'evento di scroll quando il componente viene distrutto
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style>
.superContainer {
    width: 100%; /* Imposta la larghezza al 100% */
    max-width: 100%; /* Impedisce la larghezza superiore a quella del contenitore */
    padding-bottom: 30px; /* Margine inferiore per evitare sovrapposizioni con il messaggio di caricamento */
}

.img-Cube {
    margin-top: 1%;
}

.loading-text {
    text-align: center;
    padding: 10px;
    color: #999;
}
</style>
