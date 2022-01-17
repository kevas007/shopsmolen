<template>
    <div class="mt-10" v-if="boutiques">
              <a @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
        </a>
        <p>Toutes les boutiques</p>
 <div v-if="boutiques.length" class="grid grid-cols-4 gap-4 m-10">
    <div v-for="boutique in boutiques" :key="boutique.id" class="w-full max-w-sm px-4 py-3 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-between">

            <span class="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">{{ boutique.created_at }}</span>
        </div>

        <div>
            <h1 class="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{{ boutique.name }}</h1>
            <router-link  :to="{
                            name: 'Shops',
                            params: {
                                id: boutique.id,
                            },
                        }">
                More...
            </router-link>
        </div>

    </div>
    </div>
    <div v-else>
        <p>
            Aucune boutique
        </p>

    </div>
    </div>
</template>
<script>
import axios from "axios"
import { mapState } from 'vuex'
export default {
    data() {
        return {
        boutiques: null,
        }
    },
    mounted() {
        axios.get('https://api-moshop.molengeek.pro/api/v1/shops', {
            headers: {
                "Authorization": "Bearer " + this.token,
            }
        })
            .then(response => {
                this.boutiques = response.data.data
            })
            .catch(error => {
                console.log(error)
            })
    },
    computed: {
        ...mapState([
            'token'
        ])
    }
}
</script>