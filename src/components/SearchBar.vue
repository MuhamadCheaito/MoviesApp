<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useStore } from '../store';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const store = useStore();

const {currentPage,selectedGenres,searchTerm} = storeToRefs(store);

const {fetchSearchMovies,fetchAllMovies,resetCurrentPage} = store;

function fetchSearchTerm()
{   
    resetCurrentPage();
    const apiPage = currentPage.value + 1
    if(searchTerm.value !== "")
        fetchSearchMovies(apiPage, searchTerm.value);
    else
        fetchAllMovies(apiPage,selectedGenres.value)
    
}
</script>

<template>
     <div class="col">
                <div class="p-inputgroup" >
                    <InputText class="w-full" placeholder="Search For A Movie" 
                    v-model="searchTerm"/>
                    <Button icon="pi pi-search" 
                    v-on:click="fetchSearchTerm()"
                    class="p-button-warning"/>
                </div>
            </div>
</template>