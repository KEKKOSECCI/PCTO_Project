<template>

        <h1 id="homeTitolo">{{lingua.home}}</h1>
        <ImgFilmSerie/>

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
#homeTitolo{
    position:relative;
    top:5%;
    padding: 0;
    font-size: 5vw; /* La dimensione varia in base alla larghezza dello schermo */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (max-width: 768px) {
  .swiper-slide {
    width: 90% !important; /* Occupa quasi tutta la larghezza dello schermo */
  }
}
#logos{
    width:1.5%;
    position:fixed;
    left:58%;
    top:2.8%;
}

@media (max-width: 480px) {
  .swiper-slide {
    width: 100% !important;
    
  }
  #homeTitolo{
    top:30% !important;
    font-size:10vw;
  }
}
@media (max-width: 768px) {
  .swiper-slide {
    width: 100% !important;
    
  }
  #homeTitolo{
    top:30% !important;
    font-size:10vw;
  }
}
</style>

  