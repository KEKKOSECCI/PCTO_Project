<template>
    <SideBar />
    <Ordine />
    <div class="box">
        <CardCatalogo 
            v-for="(element, index) in filteredArray" 
            :key="element.id" 
            :oggetto="element" 
            :type="typeRight(element)" 
        />
        <div v-if="loading" class="loading-text">Caricamento...</div>
    </div>
</template>
<script>
// Nel componente Vue
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { dataStore } from '../data/data';
import CardCatalogo from '../components/cardCatalogo.vue';
import SideBar from '../components/SideBar.vue';
import Ordine from '../components/ordine.vue';

export default {
    components: { CardCatalogo, SideBar, Ordine },
    setup() {
        const currentPage = ref(2);
        const loading = ref(false);
        const filteredArray = ref([]);
        const defaultArray = ref([]); // Salva una copia di default per reimpostare
        const pageMaxFilm = ref(0);
        const pageMaxSerie = ref(0);

        const typeRight = (element) => ('name' in element ? 'tv' : 'movie');

        // Funzione per applicare l'ordinamento
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
                    filteredArray.value = [...defaultArray.value];
                    break;
                default:
                    break;
            }

            // Salva l'ordinamento selezionato nel localStorage
            localStorage.setItem('ordinamento', sortType);
        };

        const valutazioneCrescente = () => {
            filteredArray.value = filteredArray.value.sort((a, b) => a.vote_average - b.vote_average);
        };

        const valutazioneDecrescente = () => {
            filteredArray.value = filteredArray.value.sort((a, b) => b.vote_average - a.vote_average);
        };

        const popolaritaCrescente = () => {
            filteredArray.value = filteredArray.value.sort((a, b) => a.popularity - b.popularity);
        };

        const popolaritaDecrescente = () => {
            filteredArray.value = filteredArray.value.sort((a, b) => b.popularity - a.popularity);
        };

        // Funzione di fetch dei risultati
        const fetchSearchResults = async () => {
            if (dataStore.search.length < 3) {
                filteredArray.value = [...dataStore.dataFilm, ...dataStore.dataSerie];
                defaultArray.value = [...filteredArray.value]; // Salva una copia dell'array completo
                return;
            }

            loading.value = true;
            try {
                const filmData = await dataStore.searchData(dataStore.search, 'film');
                const serieData = await dataStore.searchData(dataStore.search, 'serie');

                pageMaxFilm.value = filmData.total_pages;
                pageMaxSerie.value = serieData.total_pages;

                filteredArray.value = [
                    ...(filmData?.results || []),
                    ...(serieData?.results || []),
                ];
                defaultArray.value = [...filteredArray.value]; // Salva la copia di default
            } catch (error) {
                console.error("Errore durante la ricerca:", error);
            } finally {
                loading.value = false;
            }
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= docHeight - 10) {
                loadMore();
            }
        };

        const loadMore = async () => {
            if (loading.value) return;
            loading.value = true;

            let filmData = {};
            let serieData = {};
            let concat = [];

            if (currentPage.value <= pageMaxFilm.value) {
                filmData = await dataStore.searchDataMore(dataStore.search, 'film', currentPage.value);
            }
            if (currentPage.value <= pageMaxSerie.value) {
                serieData = await dataStore.searchDataMore(dataStore.search, 'serie', currentPage.value);
            }

            if (currentPage.value <= pageMaxFilm.value && currentPage.value > pageMaxSerie.value) {
                concat = [...filmData.results];
            }

            if (currentPage.value > pageMaxFilm.value && currentPage.value <= pageMaxSerie.value) {
                concat = [...serieData.results];
            }
            if (currentPage.value <= pageMaxFilm.value && currentPage.value <= pageMaxSerie.value) {
                concat = [...filmData.results, ...serieData.results];
            }

            if (currentPage.value <= pageMaxFilm.value || currentPage.value <= pageMaxSerie.value) {
                filteredArray.value = [...filteredArray.value, ...concat];
                currentPage.value++;
            }

            loading.value = false;
        };

        // Watch per rilevare il cambiamento nell'ordinamento
        watch(
            () => dataStore.ordinamento,
            (newSortType) => {
                applySorting(newSortType); // Applica il nuovo ordinamento
            }
        );

        watch(() => dataStore.search, fetchSearchResults);

        onMounted(() => {
            fetchSearchResults();
            // Applica l'ordinamento salvato
            applySorting(dataStore.ordinamento);
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            filteredArray,
            loading,
            typeRight,
        };
    },
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
