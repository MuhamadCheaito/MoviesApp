<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import CheckBox from 'primevue/checkbox';
import { useStore } from '../store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import FilterButton from './FilterButton.vue';

const store = useStore();
const {genres,selectedGenres,currentPage} = storeToRefs(store);
const {fetchAllMovies,resetCurrentPage,setSelectedGenres} = store;

const getGenres = computed(() => {
    return store.getGenres;
})

function onChange(){
  setSelectedGenres(selectedGenres.value);
}
const fetchByGenre = () => {
 resetCurrentPage();   
 fetchAllMovies(currentPage.value + 1,
                selectedGenres.value.join(', '));
                
}
</script>

<template>
  <Accordion :activeIndex="0">
	<AccordionTab header="Filter By Genre">
  <div class="grid">
    <div class="col-5 md:col-4 lg:col-8" v-for="genre in getGenres" :key="genre">
      <CheckBox name="genres" :value="genre.id" v-model="selectedGenres"
      @change="onChange"
      /> {{genre.name}}
    </div>
  </div>
    <filter-button @click="fetchByGenre()"/>
	</AccordionTab>
  </Accordion>
</template>
