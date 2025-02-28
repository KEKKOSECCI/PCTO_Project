<template>

    <label for="toggle" @click="goHome">
        <input type="checkbox" id="toggle" v-model="lingua" />
        <span class="slider"></span> <!-- Personalizza l'aspetto del toggle -->
    </label>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import dataStore from '../data/data';

export default {
    setup() {
        const router = useRouter();
        const lingua = ref(false); // Lingua inglese: false (italiano), true (inglese)

        // Usa `watch` per monitorare il cambiamento di `lingua`
        watch(lingua, async (newLingua) => {
            // Chiama la funzione changeLanguage dal dataStore
            await dataStore.changeLanguage(newLingua, dataStore.dataFilm.length / 20, dataStore.dataSerie.length / 20);  // Passa il valore della lingua
        });
        const goHome = () => {
            router.push({ name: 'home' });
        }
        return { lingua, goHome };
    }
};
</script>

<style>
/* Stili del toggle */
input[type="checkbox"] {
    display: none;
}

label {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: fixed;
    top: 3%;
    right: 3%;
    z-index: 1000;
}

.slider {
    width: 50px;
    height: 24px;
    background-color: #4dffdb;
    border-radius: 50px;
    position: relative;
    transition: 0.4s;
}

.slider::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-image: url('/public/images/Flag_of_the_Repubblica_Cisalpina.svg.png');
    background-size: cover;
    background-position: center;
    left: 4px;
    bottom: 3px;
    transition: 0.4s;
}



input[type="checkbox"]:checked+.slider::before {
    transform: translateX(26px);
    background-image: url('/public/images/images.png');
}
@media (max-width: 768px) {
  label{
    top:4.5%;
    right:4px;
  }
  .slider{
    width:40px;
  }
  input[type="checkbox"]:checked+.slider::before {
    transform: translateX(15px);

}
}
</style>
