<template>
  <div class="carte">
    <AppLink
      :to="{ name: 'details.show', params: { id: oggetto.id, slug: oggetto.title || oggetto.name, type: type } }"
      @click="set(oggetto)">
      <div>
        <img id="immagine" :src="src" alt="">
        <h4 id="titolo">{{ oggetto.title || oggetto.name }}</h4>
      </div>
    </AppLink>
  </div>
</template>

<script>
import { computed } from 'vue';
import AppLink from './AppLink.vue';
import dataStore from '../data/data';

export default {
  components: { AppLink },
  props: {
    oggetto: { type: Object, required: true },
    type: { type: String, required: true }
  },
  setup(props) {
    // Funzione che imposta l'oggetto dei dettagli
    const set = (oggetto) => {
      dataStore.setOggettoDetails(oggetto);
    };

    // Computed property per l'immagine
    const src = computed(() => {
      return `https://image.tmdb.org/t/p/original${props.oggetto.poster_path}`;
    });

    // Restituisci le proprietà che ti servono nel template
    return {
      set,
      src,
      oggetto: props.oggetto,
      type: props.type
    };
  }
};
</script>

<style>
#immagine {
  width: 250px;
}

#titolo {
  font-size: 2vh;
  color: white;
}
@media (max-width: 480px) {
  #immagine{
    width:100%;
    border-radius: 10px !important;
  }
  .carte{
    width:100%;
  }
  #titolo{
    font-size:1.5vh;
    padding:0;
    margin:0;
  }
}
</style>
