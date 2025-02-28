import { reactive } from 'vue';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDVlNjUyODg1NmNjMGJjYzJkODY5NTBhNTQ4ZDllZSIsIm5iZiI6MTczOTQ1MjI5Ni43OTEwMDAxLCJzdWIiOiI2N2FkZWY4OGE1OGNlYWQzOGQ5ZjUwYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5CntQrKFcQdtkrjf7F_FQ5X5_E3lavQW5x6amqjAuoY';
const lingua = "it-IT"; // Lingua predefinita

// Stato reattivo globale
export const dataStore = reactive({
  dataFilm: [],
  dataSerie: [],
  generiFilm: [],
  generiSerie: [],
  lingua: lingua,  // Lingua di partenza
  pageFilm:2,
  pageSerie:2,
  search:'',
  ordine:false,
  ordinamento:-1,
  oggettoDetails:{"nome":"mario"},

  // Funzione per cambiare la lingua
  async changeLanguage(newLingua,pageFilm,pageSerie) {
    this.lingua = newLingua ? "en-US" : "it-IT"; // Cambia la lingua tra italiano (it-IT) e inglese (en-US)

    // Ricarica i dati in base alla lingua
    await this.fetchData(pageFilm,pageSerie);
  },
  setOggettoDetails(oggetto){
    this.oggettoDetails = oggetto
  },
  async getDati(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Errore HTTP! Status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("Errore nel fetch:", err);
      return null;
    }
  },
  
  async fullData(type, count) {
    let concat = [];

    for (let i = 0; i < count; i++) {
      const url = type === 'film'
        ? `https://api.themoviedb.org/3/trending/movie/week?language=${this.lingua}&page=${i + 1}`
        : `https://api.themoviedb.org/3/trending/tv/week?language=${this.lingua}&page=${i + 1}`;

      const dati = await this.getDati(url);
      if (dati?.results) {
        concat = [...concat, ...dati.results];
      }
    }
    
    return concat;
  },
  async generi(id,type){
    return await this.getDati(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=${this.lingua}&page=1&with_genres=${id}`)
  },
  async moreGeneri(id,type,page){
    return await this.getDati(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=${this.lingua}&page=${page}&with_genres=${id}`)
  },
  async idDettagli(type,id){
   return await this.getDati(`https://api.themoviedb.org/3/${type}/${id}?language=${this.lingua}`)
  },
  async searchData(string,type){
    if(type=='film')
    return await this.getDati(`https://api.themoviedb.org/3/search/movie?query=${string}&include_adult=false&language=${this.lingua}`)
    return await this.getDati(`https://api.themoviedb.org/3/search/tv?query=${string}&include_adult=false&language=${this.lingua}`)
  },
  async searchDataMore(string,type,page){
    if(type=='film')
    return await this.getDati(`https://api.themoviedb.org/3/search/movie?query=${string}&include_adult=false&language=${this.lingua}&page=${page}`)
    return await this.getDati(`https://api.themoviedb.org/3/search/tv?query=${string}&include_adult=false&language=${this.lingua}&page=${page}`)
  },
  /* async newDataSearch(type,count){
    if(type)
  }, */
  async newData(type, count) {
    return await this.getDati(`https://api.themoviedb.org/3/trending/${type}/week?language=${this.lingua}&page=${count}`)
},

  async fetchData(pageFilm,pageSerie) {
    const [filmData, serieData] = await Promise.all([
      this.fullData('film', pageFilm),
      this.fullData('serie', pageSerie),
  ]);

  this.dataFilm = filmData || [];
  this.dataSerie = serieData || [];

  // Chiamata separata per i generi
  const generiFilmRes = await this.getDati(`https://api.themoviedb.org/3/genre/movie/list?language=${this.lingua}`);
  const generiSerieRes = await this.getDati(`https://api.themoviedb.org/3/genre/tv/list?language=${this.lingua}`);

  // Assicurati che `genres` esista
  this.generiFilm = generiFilmRes?.genres || [];
  this.generiSerie = generiSerieRes?.genres || [];
  }
});

// Carica i dati iniziali all'avvio
dataStore.fetchData(2,2);

export default dataStore;
