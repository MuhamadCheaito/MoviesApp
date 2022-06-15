<script setup>
import { storeToRefs } from "pinia";
import {  onMounted } from "vue";
import { useStore } from "../store";
import {useStorageStore} from '../store/storage'
import MovieCard from "./MovieCard.vue";
import Paginator from 'primevue/paginator';

const store = useStore();
const storage = useStorageStore();

const {fetchAllMovies,fetchAllGenres,fetchSearchMovies} = store;

const {moviesList} = storeToRefs(store);

function onPage(event) {
   storage.setCurrentPage(event.page + 1);
   if(localStorage.getItem(storage.SEARCH_TERM) !== ""){
        fetchSearchMovies(localStorage.getItem(storage.CURRENT_PAGE),
                          localStorage.getItem(storage.SEARCH_TERM))
   }
   else
        fetchAllMovies(localStorage.getItem(storage.CURRENT_PAGE),
                       localStorage.getItem(storage.SELECTED_GENRES));
}
onMounted(() => {
    storage.init();
    fetchAllMovies(localStorage.getItem(storage.CURRENT_PAGE));
    fetchAllGenres();
})

</script>

<template>
    <section id="feed">
        <div class="grid">
        <div class="col-12 md:col-6 lg:col-3 mt-2" 
        v-for="movie in moviesList.results" :key="movie.id">
            <movie-card :movie="movie"></movie-card> 
        </div>
        </div>
        <Paginator :rows="10" :totalRecords="moviesList.total_pages > 1000 ? moviesList.total_pages/100 : moviesList.total_pages" 
        @page="onPage($event)"></Paginator>
    </section>
</template>