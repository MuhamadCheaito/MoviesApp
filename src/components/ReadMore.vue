<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';

const expand = ref(false);

const props = defineProps({
    overview: "",
})

const expandMore = () => {
    expand.value = true
}
const expandLess = () => {
    expand.value = false;
}
</script>

<template>
<div  v-if="expand">
        <span>{{overview}}</span>
        <Button label="<<Read Less" @click="expandLess"  class="p-button-sm p-button-link" style="padding:0"></Button>
    </div>
    
    <div v-else>
        <span>{{overview.substr(0,100)+"..."}}</span>
        <Button label="Read More>>" @click="expandMore"  class="p-button-sm p-button-link" style="padding:0"></Button>
    </div>
</template>