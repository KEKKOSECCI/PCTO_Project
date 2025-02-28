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
import { ref, computed, } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import dataStore from '../data/data';
import lingua from '../lingua.json';

export default {
  name: 'SearchBox',
  setup() {
    const query = ref('');
    const router = useRouter();
    const route = useRoute();

    const placeHolder = computed(() => {
      return dataStore.lingua === "it-IT" ? lingua.languages[1].ricerca : lingua.languages[0].ricerca;
    });

    const handleInput = () => {
      if (query.value.length >= 3) {
        router.push({ name: 'search.show' });
        dataStore.search = query.value;
      }
    };

    const handleSearch = () => {
      if (query.value.trim()) {
        router.push({ name: 'search.show', query: { query: query.value } });
      }
    };

    const forceSearch = () => {
      dataStore.search = query.value;
      handleSearch();
    };


    return {
      query,
      handleInput,
      handleSearch,
      forceSearch,
      placeHolder
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
@media (max-width: 480px) {
  .search-box{
    top:10%;
    left: 50%;
    transform: translateX(-50%);

  }
}
</style>
