<template>
    <div v-if="setShops">
        <a @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
        </a>
        <div  class="hello container mt-10 p-1">
            <p>{{ setShops.name }}</p>
            <div class="grid grid-cols-4 gap-4">
            <BoutiqueShow  v-for="shop in   setShops.products" :key="shop.id" :shop="shop"/>
            </div>
        </div>
    </div>
</template>
<script>
import{ mapState} from 'vuex'
import axios from "axios"
import BoutiqueShow from './BoutiqueShow.vue'
export default {
    data() {
        return {
            setShops: null,
        };
    },
    methods: {},
    props: {
        id: {
            type: [Number, String],
            required: true
        }
    },
    mounted() {
        console.log(localStorage.getItem("token"));
        axios.get(`https://api-moshop.molengeek.pro/api/v1/shop/${this.id}`, {
            headers: {
                "Authorization": "Bearer " + this.token
            }
        })
            .then(response => {
            this.setShops = response.data.data;
        })
            .catch(error => {
            console.log(error);
        });
    },
    computed: {
        ...mapState([
            "token"
        ]),
    },
    components: { BoutiqueShow }
}
</script>