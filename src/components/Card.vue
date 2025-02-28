<template>

        <div class="card">
            <div class="card-image">
                <img v-bind:src="'https://image.tmdb.org/t/p/original' + this.oggetto.backdrop_path">
                <div class="overlay"></div>
            </div>
            <p class="title">{{ titleFixed }}</p>
            <p id=overview>{{ testoTroncato }}</p>
            <p class="raiting">{{ this.oggetto.vote_average.toFixed(1) }}</p>
        </div>


</template>
<script>
import AppLink from './AppLink.vue';
import {dataStore} from '../data/data';
let film = dataStore.dataFilm;
let serie = dataStore.dataSerie;


export default {
    components:{AppLink},
    props: {
        /* Gli passo poi nel carousel l'oggeto che voglio fare la card */
        oggetto: { type: Object, required: true }
    },
    computed: {
        titleFixed() {
            if (this.oggetto.title == null)
                return this.oggetto.name.split(" ").slice(0, 3).join(" ")
            else
                return this.oggetto.title.split(" ").slice(0, 3).join(" ")
        },
        testoTroncato() {
            const maxParole = 5; // Numero massimo di parole fisso
            const parole = this.oggetto.overview.split(" ");
            return parole.length > maxParole
                ? parole.slice(0, maxParole).join(" ") + "..."
                : this.oggetto.overview;
        }
    },
    setup(){
        return dataStore
    }
}

</script>
<style>
.card-image {
    width: 100%;
    height: 100%;
    position: relative;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card {
    margin: 0px;
    width: auto;
    height: 100%;
    border-radius: 18px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 0px;

}


.raiting {
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: 60%;
    right: 8%;
    text-align: center;
    color: white;
    opacity: 1;
    visibility: visible;
    z-index: 2;
}

.title {

    max-width: 90%;
    word-wrap: 60%;
    overflow-wrap: break-word;
    white-space: normal;
    font-weight: bold;
    position: absolute;
    top: 60%;
    left: 7%;
    text-align: left;
    color: white;
    opacity: 1;
    visibility: visible;
    z-index: 2;
    transition: opacity 0.4s ease, transform 0.4s ease;
}

#overview {
    font-size: 12px !important;
    max-width: 65%;
    word-wrap: 60%;
    overflow-wrap: break-word;
    white-space: normal;
    position: absolute;
    top: 69%;
    left: 7%;
    text-align: left;
    color: white;
    opacity: 0;
    visibility: visible;
    z-index: 2;
    transition: opacity 0.4s ease, transform 0.4s ease;
    
}

.card:hover #overview {
    opacity: 1;
}

.card:hover .title {
    transform: translateY(-20px);
    /* Parte spostato in basso */
}

p {

    color: #fff;
}

.overlay {
    border-radius: 19px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    opacity: 1;
    visibility: visible;
    z-index: 1;
} 

@media (max-width: 480px) {
  #immagine{
    width:118px;
    border-radius: 10px !important;
  }
  #titolo{
    font-size:1.5vh;
    padding:0;
    margin:0;
  }
}
</style>