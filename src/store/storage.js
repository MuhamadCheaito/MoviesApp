import { defineStore } from "pinia";

export const useStorageStore = defineStore('storage',{
    state : () => {
        return {
            SEARCH_TERM: "searchTerm",
            SELECTED_GENRES: "selectedGenres",
            CURRENT_PAGE: "currentPage"
        }

    },
    actions: {
        init(){
            localStorage.setItem("searchTerm",'')
            localStorage.setItem("currentPage",1)
            localStorage.setItem("selectedGenres",'')
        },
        setSearch(search){
            localStorage.setItem("searchTerm",search);
        },
        setCurrentPage(currentPage){
            localStorage.setItem("currentPage",currentPage)
        },
        setSelectedGenres(selectedGenres){
            localStorage.setItem("selectedGenres",selectedGenres)
        }
    }
}) 