<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useStore } from '../store';
import { ref } from 'vue';
import { useStorageStore } from '../store/storage';

const store = useStore();
const storage = useStorageStore();
let searchTerm = ref("");

const {fetchSearchMovies,fetchAllMovies} = store;

function fetchSearchTerm()
{
    storage.setSearch(searchTerm.value);
    storage.setCurrentPage(1);
    if(localStorage.getItem(storage.SEARCH_TERM) !== "")
        fetchSearchMovies(localStorage.getItem(storage.CURRENT_PAGE),
                          localStorage.getItem(storage.SEARCH_TERM));
    else
        fetchAllMovies(localStorage.getItem(storage.CURRENT_PAGE),
                       localStorage.getItem(storage.SELECTED_GENRES))
    
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