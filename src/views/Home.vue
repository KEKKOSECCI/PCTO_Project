<template>
    <div class="homeContainer">
        <h1 id="homeTitolo">{{lingua.home}}</h1>
        <ImgFilmSerie/>
    </div>
</template>
<script>
import ImgCube from '../components/imgCube.vue';
import ImgFilmSerie from '../components/imgFilmSerie.vue';
import {dataStore} from '../data/data';
import data from '../lingua.json'




export default {
    components:{ImgCube,ImgFilmSerie},
    computed:{
        dati(){
            return lin
        },
        lingua(){
            if(dataStore.lingua == "it-IT")
            return data.languages[1]
            return data.languages[0]
        }
    },
    setup(){
        return dataStore;
    }
}
console.log(dataStore)
</script>
<style>
.homeContainer{
    margin-top:7%;
}
</style>

  