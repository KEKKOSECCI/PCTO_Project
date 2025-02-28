<template>
  <div id="sideBar">
    <ul>
      <!-- Lista dei Film -->
      <li class="big">
        <AppLink :to="{ name: 'catalogoAll.show', params: { type: 'movie' } }">{{ lingua.film }}</AppLink>
        <ul class="ulBig">
          <li v-for="(genere, index) in generiFilm" :key="index">
            <AppLink :to="{ name: 'catalogo.show', params: { type: 'movie', genere: genere.name } }">
              {{ genere.name }}
            </AppLink>
          </li>
        </ul>
      </li>

      <!-- Lista delle Serie -->
      <li class="big">
        <AppLink :to="{ name: 'catalogoAll.show', params: { type: 'tv' } }">{{ lingua.serieTv }}</AppLink>
        <ul class="ulBig">
          <li v-for="(genere, index) in generiSerie" :key="index">
            <AppLink :to="{ name: 'catalogo.show', params: { type: 'tv', genere: genere.name } }">
              {{ genere.name }}
            </AppLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import dataStore from '../data/data';
import AppLink from './AppLink.vue';
import data from '../lingua.json'
export default {
  components: { AppLink },
  setup() {
    // Generi reattivi usando computed
    const generiFilm = computed(() => dataStore.generiFilm);
    const generiSerie = computed(() => dataStore.generiSerie);
    const lingua = computed(()=>{
        if(dataStore.lingua == "it-IT")
        return data.languages[1]
        return data.languages[0]
    });
    return {
      generiFilm,
      generiSerie,
      lingua
    };
  }
};
</script>

<style>
#sideBar {
  position: fixed;
  width: 15%;
  left: 0;
  height: 100%;
  background: #2e2e2e;
  padding: 15px 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  overflow-y: auto;
}

.big {
  font-size: 1.5em;
  position: relative;
  cursor: pointer;
}

.big > a {
  font-size: 1.0em;
  position: relative;
  cursor: pointer;
}

/* Stile per i link */
li > a {
  font-size: 0.7em;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  padding: 5px 0;
  text-decoration: none;
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

/* Nasconde la scrollbar ma permette lo scroll */
#sideBar {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE e Edge */
}

#sideBar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari */
}

li {
  margin-bottom: 12px;
  text-align: left;
}

/* Nascondo i generi inizialmente */
.ulBig {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

/* Mostro i generi al passaggio del mouse */
.big:hover .ulBig {
  max-height: 100vh;
}

/* Stile per la responsività */
@media (max-width: 768px) {
  #sideBar {
    display:none;
  }
}
</style>
