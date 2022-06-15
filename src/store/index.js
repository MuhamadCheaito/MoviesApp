import { defineStore } from "pinia";
import { API_KEY } from '../config/env';
import api from "../services/api";

export const useStore = defineStore('main', {
    state: () => {
        return {
            moviesList:[],
            genres:[],
            externalIds:[],
            currentPage: 0,
            searchTerm: '',
            selectedGenres: [],
        }
    },
    getters:{
        getGenres(state){
            return state.genres.genres;
        },
        getExternalIds(state){
            return state.externalIds;
        }
    },
    actions:{
        async fetchAllMovies(currentPage,genres) {
            const data = await api.get(`/discover/movie?api_key=${API_KEY}&page=${currentPage}&with_genres=${genres}`,{
                params:{
                    language:"en-US",
                }
            }).then(res => res.data);

            this.moviesList = data;
        },
        async fetchExternalIds(movie_id){
            const data  = await api.get(`/movie/${movie_id}/external_ids?api_key=${API_KEY}`)
                                   .then(res => res.data);
            
            this.externalIds = data;
        },
        async fetchSearchMovies(currentPage,searchTerm){
            const data = await api.get(`/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${currentPage}`)
                                  .then(res => res.data);

            this.moviesList = data;
        },
        async fetchAllGenres(){
            const data = await api.get(`/genre/movie/list?api_key=${API_KEY}`)
                                  .then(res => res.data);
            this.genres = data;
        },
        async resetCurrentPage(){
            this.setCurrentPage(0);
        },
        async setCurrentPage(currentPage){
            this.currentPage = currentPage
        },
        async setSearchTerm (searchTerm){
            this.searchTerm = searchTerm
        },
        async setSelectedGenres (selectedGenres){
            this.selectedGenres = selectedGenres
        }
    }
})