<template>
        <div id="container">
        <div class="card-image">
            <img :src="srcGiusto">
            <div id="overlay"></div>
        </div>
        <p id="title" class="font-titolo">{{ this.oggetto.title || this.oggetto.name.split(" ").slice(0, 3).join(" ") }}</p>
    </div>

    
</template>
<script>
import AppLink from './AppLink.vue';

export default {
    components:{AppLink},
    props: {
        oggetto: { type: Object, required: true }
    },
    computed: {
        srcGiusto() {
            return `https://image.tmdb.org/t/p/original${this.oggetto.backdrop_path}`
        }
    }
}
</script>
<style>
.card-image{
    border-radius: 20px;
    width:100%;
    height:100%;
    position: relative;
}
img {
    border-radius:20px;
    position: relative;
    width: 600px;
    height:auto;
    object-fit: cover;
}
#raiting {
    font-size: 16px;
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
#title {
    width:100%;
    word-wrap: 60%;
    overflow-wrap: break-word;
    white-space: normal;
    font-weight: bold;
    font-size: 3vh;
    position: absolute;
    top:80%;
    text-align: center;
    color: #ffffff;
    opacity: 1;
    visibility: visible;
    z-index: 2;
}
#overlay{
    border-radius: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    opacity: 1;
    visibility: visible;
    z-index: 1;
}
#container {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: -1px -1px 20px 0.1px #213547,  /* Ombra soffusa in alto a sinistra */
                 1px -1px 20px 0.1px #213547,  /* Ombra soffusa in alto a destra */
                 -1px 1px 20px 0.1px #213547,  /* Ombra soffusa in basso a sinistra */
                  1px 1px 20px 0.1px #213547;   /* Ombra soffusa in basso a destra */
}


</style>