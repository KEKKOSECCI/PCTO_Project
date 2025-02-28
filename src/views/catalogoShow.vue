<template>
    <SideBar />
    <Ordine />
    <div class="box">
        <!-- Grid di card -->
        <CardCatalogo v-for="(element, index) in array" :key="element.id" :oggetto="element" :type="type" />
        <div v-if="loading" class="loading-text">Caricamento...</div>
    </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import CardCatalogo from '../components/cardCatalogo.vue';
import SideBar from '../components/SideBar.vue';
import { dataStore } from '../data/data';
import Ordine from '../components/ordine.vue';

export default {
    components: { CardCatalogo, SideBar, Ordine },
    props: {
        type: { type: String, required: true },
        genere: { type: String, required: true }
    },

    setup(props) {
        const loading = ref(false);
        const currentPage = ref(2);
        const array = ref([]);
        const page = ref(0);
        const defaultArray = ref([]);

        const idGenere = computed(() => {
            let genereTrovato;
            if (props.type === 'movie') {
                genereTrovato = dataStore.generiFilm.find(genereObj => genereObj.name === props.genere);
            } else {
                genereTrovato = dataStore.generiSerie.find(genereObj => genereObj.name === props.genere);
            }
            return genereTrovato ? genereTrovato.id : null;
        });

        const fetchStart = async () => {
            const oggetto = await dataStore.generi(idGenere.value, props.type);
            array.value = [...oggetto.results];
            defaultArray.value = [...array.value]; // Salva l'array originale
            page.value = oggetto.total_pages;
            applySorting(dataStore.ordinamento); // Applica ordinamento iniziale
        };

        // Funzioni di ordinamento
        const applySorting = (sortType) => {
            switch (sortType) {
                case 1:
                    popolaritaDecrescente();
                    break;
                case 2:
                    popolaritaCrescente();
                    break;
                case 3:
                    valutazioneDecrescente();
                    break;
                case 4:
                    valutazioneCrescente();
                    break;
                case 0:
                case -1:
                    array.value = [...defaultArray.value];
                    break;
                default:
                    break;
            }
        };

        const valutazioneCrescente = () => {
            array.value = [...array.value].sort((a, b) => a.vote_average - b.vote_average);
        };

        const valutazioneDecrescente = () => {
            array.value = [...array.value].sort((a, b) => b.vote_average - a.vote_average);
        };

        const popolaritaCrescente = () => {
            array.value = [...array.value].sort((a, b) => a.popularity - b.popularity);
        };

        const popolaritaDecrescente = () => {
            array.value = [...array.value].sort((a, b) => b.popularity - a.popularity);
        };

        const loadMore = async () => {
            let nuovo
            if (loading.value) return;
            loading.value = true;
            try {
                nuovo = await dataStore.moreGeneri(idGenere.value,props.type,currentPage.value);
                array.value = [...array.value,...nuovo.results]
                currentPage.value++;
            } catch (error) {
                console.error("Errore nel caricamento dei dati:", error);
            } finally {
                loading.value = false;
            }
        };

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollPosition >= documentHeight - 100) {
                loadMore();
            }
        };

        watch(() => dataStore.ordinamento, (newSortType) => {
            applySorting(newSortType);
        });

        watch([() => props.type, () => props.genere], async () => {
            await fetchStart();
        });

        onMounted(async () => {
            await fetchStart();
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return { array, loading, handleScroll };
    }
};
</script>

<style scoped>
.box {
    display: grid;
    width: 85%;
    margin-left: 15%;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 5%;
    overflow-y: auto;
    height: auto;
}

.loading-text {
    text-align: center;
    padding: 10px;
    color: #999;
}
</style>
