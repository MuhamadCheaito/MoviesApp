<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useStore } from "../store";
import Button from 'primevue/button';
import Card from 'primevue/card';
import Image from 'primevue/image'
import ReadMore from "./ReadMore.vue";

const store = useStore();
const props = defineProps({
    movie: {}
})
const {genres} = storeToRefs(store);
const {fetchExternalIds} = store;
const getGenres = computed(() => {
    return store.getGenres;
})
const getExternalIds = computed(() => {
  return store.getExternalIds;
})
const getAllMovieGenres = (movie_genres, movie_genres_ids) => {
      if (movie_genres) {
        return movie_genres.filter((genre) => movie_genres_ids.includes(genre.id))
                            .map((g) => g.name).join(", ");
      }
}
const fetchAllExternalIds = (movie_id) => {
    fetchExternalIds(movie_id)
}

</script>

<template>
  <Card style="height:100%;">
    <template #header>
        <img :alt="movie.original_title" 
        :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path">
    </template>
    <template #title>
        {{ movie.title }} ({{movie.release_date.substr(0,4)}})
    </template>
    <template #content>
      <read-more v-show="movie.overview !== ''" :overview="movie.overview" />
    </template>
    <template #footer>
    <div class="bottom">
    <h5>Genres</h5>
    <p class="mb-3">{{ getAllMovieGenres(getGenres, movie.genre_ids) }}</p>
    <a :href="`https://imdb.com/title/${getExternalIds.imdb_id}`" 
    v-on:mouseover="fetchExternalIds(movie.id)"  target="_blank"
    style="text-decoration:none;">
    <Button label="IMDB" style="font-weight: 700;" class="p-button-warning"></Button></a>
    </div>
    </template>
  </Card>
</template>

