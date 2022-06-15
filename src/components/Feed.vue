<script setup>
import { storeToRefs } from "pinia";
import {  computed, onMounted, ref } from "vue";
import { useStore } from "../store";
import MovieCard from "./MovieCard.vue";
import Paginator from 'primevue/paginator';

const store = useStore();

const {fetchAllMovies,fetchAllGenres,fetchSearchMovies,setCurrentPage,resetCurrentPage} = store;
const {moviesList,currentPage,searchTerm,selectedGenres} = storeToRefs(store);

function onPage(event) {
   setCurrentPage(event.page)
   const apiPage = currentPage.value + 1
   if(searchTerm.value !== ""){
        fetchSearchMovies(apiPage,searchTerm.value)
   }
   else
        fetchAllMovies(apiPage,selectedGenres.value);
}
const getOffset = computed(() => {
    return currentPage.value * 10
})
onMounted(() => {
    fetchAllMovies(1);
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
        <Paginator v-model:first="getOffset" :rows="10" :totalRecords="moviesList.total_pages > 1000 ? moviesList.total_pages/10 : moviesList.total_pages" 
        @page="onPage($event)"></Paginator>
    </section>
</template>