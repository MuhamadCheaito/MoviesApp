<script setup>
import SearchBar from './SearchBar.vue';
import FilterList from './FilterList.vue';
import FilterButton from './FilterButton.vue';

</script>


<template>
    <aside class="sidebar-main">
        <search-bar></search-bar>
        <filter-list :checked="false"></filter-list>
    </aside>
</template>