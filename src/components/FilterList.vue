<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import CheckBox from 'primevue/checkbox';
import { useStore } from '../store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import FilterButton from './FilterButton.vue';
import { useStorageStore } from '../store/storage';

const store = useStore();
const storage = useStorageStore();
const {genres} = storeToRefs(store);
const {fetchAllMovies} = store;
let selectedGenre = ref([]);
const getGenres = computed(() => {
    return store.getGenres;
})

function onChange(){
  storage.setSelectedGenres(selectedGenre.value.join(', '));
}
const fetchByGenre = () => {
 storage.setCurrentPage(1);
 fetchAllMovies(localStorage.getItem(storage.CURRENT_PAGE),
                localStorage.getItem(storage.SELECTED_GENRES));
}
</script>

<template>
  <Accordion :activeIndex="0">
	<AccordionTab header="Filter By Genre">
  <div class="grid">
    <div class="col-5 md:col-4 lg:col-8" v-for="genre in getGenres" :key="genre">
      <CheckBox name="genres" :value="genre.id" v-model="selectedGenre"
      @change="onChange"
      /> {{genre.name}}
    </div>
  </div>
    <filter-button v-on:click="fetchByGenre()"/>
	</AccordionTab>
  </Accordion>
</template>
