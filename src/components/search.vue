<template>
    <div class="search-box">
        <input 
            type="search" 
            class="search-input" 
            v-model="query" 
            @input="handleInput"
            :placeholder="placeHolder"
        >


    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import dataStore from '../data/data';
import lingua from '../lingua.json'


export default {
  name: 'SearchBox',
  computed:{
    placeHolder(){
        if(dataStore.lingua == "it-IT")
        return lingua.languages[1].ricerca
        return lingua.languages[0].ricerca
         
    }
  },

  
  setup() {
    // Imposta la variabile `query` con ref
    const query = ref('');
    const router = useRouter();

    // Funzione che gestisce l'input
    const handleInput = () => {
      if (query.value.length >= 3) {
        // Quando la lunghezza della query supera i 2 caratteri, navighiamo alla rotta
        // ma passiamo la query come parametro
        router.push({ name: 'search.show' });
        dataStore.search = query.value;
      }
    };
    const forceSearch = () =>{
      dataStore.search = query.value;
      handleSearch();

    }
    // Funzione che gestisce il click del bottone
    const handleSearch = () => {
      if (query.value.trim()) {
        // Naviga a search.show con la query come parametro
        router.push({ name: 'search.show', query: { query: query.value } });
      }
    };

    // Restituisce le variabili e le funzioni che devono essere accessibili nel template
    return {
      query,
      handleInput,
      handleSearch,
      forceSearch
    };
  }
};
</script>

<style scoped>
.search-box {
    position: fixed;
    top: 20px;
    right:7%;
    display: flex;
    align-items: center;
    gap: 5px;
    width: 250px;
    padding: 5px;
    background: #03DDBD;
    border-radius: 20px;
    z-index: 20;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input {
    flex: 1;
    border: none;
    padding: 8px 10px;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
}

.search-btn {
    border: none;
    background: #f3f3f3;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: 0.2s;
}

.search-btn:hover {
    background: #012927;
}
</style>
