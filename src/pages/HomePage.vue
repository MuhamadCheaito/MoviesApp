<script setup>
import Feed from '../components/Feed.vue';
import Sidebar from '../components/Sidebar.vue';

</script>


<template>
<section id="main">
 <span class="grid">
     <sidebar class="col-12 md:col-6 lg:col-3"></sidebar>
     <feed class="col-12 md:col-6 lg:col-9"></feed>
 </span>
</section>
</template>
