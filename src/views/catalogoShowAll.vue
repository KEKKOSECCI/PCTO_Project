<template>
    <SideBar />
    <Ordine/>
    <div id="blocco"></div>
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
    components: { CardCatalogo, SideBar,Ordine },
    props: { 
        type: { type: String, required: true }, 
    },
    
    setup(props) {
        const loading = ref(false);           // Stato di caricamento
        const currentPage = ref(1);           // Numero della pagina corrente
        const MIN_CARDS = 20;                 // Numero minimo di card desiderato
        const MAX_ATTEMPTS = 500;             // Per evitare loop infiniti
        const array = ref([])


        // Funzione per caricare più dati (sia iniziali che al scroll)
        const loadMore = async () => {
            if (loading.value) return; // Evita richieste multiple durante il caricamento
            loading.value = true;
            try {
                const nuovo =  await dataStore.newData(props.type, currentPage.value); // Carica nuovi dati
                array.value = [...array.value,...nuovo.results]
                currentPage.value++;  // Incrementa la pagina per il prossimo caricamento
            } catch (error) {
                console.error("Errore nel caricamento dei dati:", error);
            } finally {
                loading.value = false; // Fine caricamento
            }
        };

        // Funzione per gestire lo scroll infinito sulla finestra
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight; // Posizione dello scroll della finestra
            const documentHeight = document.documentElement.scrollHeight; // Altezza totale del documento

            if (scrollPosition >= documentHeight - 100) { // 100px dalla fine della finestra
                loadMore(); // Carica più dati
            }
        };

        // Funzione per controllare e caricare dati se non ci sono abbastanza card
        const ensureMinimumCards = async () => {
            let attempts = 0;
            // Finché il numero di card filtrate è inferiore al minimo e non abbiamo superato i tentativi massimi...
            while (array.value.length < MIN_CARDS && attempts < MAX_ATTEMPTS) {
                await loadMore();
                attempts++;
            }
        };

        // Carica i dati iniziali quando il componente è montato
        onMounted(async () => {
            await loadMore();           // Carica la prima pagina
            await ensureMinimumCards(); // Assicura che siano presenti almeno MIN_CARDS
            window.addEventListener('scroll', handleScroll); // Aggiungi l'evento di scroll alla finestra
        });

        // Rimuovi l'evento di scroll quando il componente viene smontato
        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll); // Rimuovi l'evento di scroll dalla finestra
        });

        // Opzionale: puoi anche usare un watch su 'array' per verificare dinamicamente
        // se, dopo ogni aggiornamento, il numero di card è insufficiente
        watch(array, async (newArray) => {
            if (newArray.length < MIN_CARDS && !loading.value) {
                await ensureMinimumCards();
            }
        });

        return { array, loading, handleScroll };
    }
};
</script>

<style scoped>
#blocco{display:none}
.box {
    display: grid;
    width: 85%;
    margin-left: 15%;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 5%;
    overflow-y: auto;
    height: auto; /* L'altezza si basa sul contenuto, non su un'altezza fissa */
}

.loading-text {
    text-align: center;
    padding: 10px;
    color: #999;
}
@media (max-width: 768px) {
  .box{
    margin-left:0;
    grid-template-columns: repeat(3, 0fr);
    width:99%;
    margin-left:auto;

    margin-top:30%;
    align-items: center;
    overflow:hidden;
  }
  #blocco{
    display:block;
    position:fixed;
    width:100%;
    height:16%;
    background-color: #1A1C28;
    z-index: 4;
  }
}
</style>
