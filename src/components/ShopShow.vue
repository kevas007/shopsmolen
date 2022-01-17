<template>
    <div class="mt-10" v-if="shop">
              <a @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
        </a>
        <div v-if="errors.length">
            <div
                class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
                <div class="px-4 py-2 -mx-3">
                    <div class="mx-3">
                        <span class="font-semibold text-red-500 dark:text-red-400">Error</span>
                        <p
                            class="text-sm text-gray-600 dark:text-gray-200"
                            v-for="error in errors"
                            :key="error"
                        >{{ error }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="success.length">
            <div
                class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
                <div class="px-4 py-2 -mx-3">
                    <div class="mx-3">
                        <span class="font-semibold text-green-500 dark:text-red-400">Succes</span>
                        <p
                            class="text-sm text-gray-600 dark:text-gray-200"
                            v-for="succes in success"
                            :key="succes"
                        >{{ succes }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
        >
            <img
                class="object-cover object-center w-full h-56"
                :src="'https://api-moshop.molengeek.pro' + shop.cover_path"
                alt="avatar"
            />

            <!-- <div class="flex items-center px-6 py-3 bg-gray-900">
                <h1 class="mx-3 text-lg font-semibold text-white">Edit</h1>
            </div> -->

            <div class="px-6 py-4">
                <h1
                    class="text-xl font-semibold text-gray-800 dark:text-white"
                >name : {{ shop.name }}</h1>
           

                <p
                    class="py-2 text-gray-700 dark:text-gray-400"
                >Description : {{ shop.description }}</p>

                <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <h1 class="px-2 text-sm">price : $ {{ shop.price }}</h1>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import { mapState } from "vuex"
export default {
    data() {
        return {
            shop: null,
            errors: [],
            success: [],
        }
    },   props: {
        id: {
            type: [Number, String],
            required: true
        }
    },
    mounted() {

        axios.get('https://api-moshop.molengeek.pro/api/v1/product/' + this.id, {
            headers: {
                "Authorization": "Bearer " + this.token,
            }
        })
            .then(response => {
                this.shop = response.data.data
            })
            .catch(error => {
                console.log(error)
            })

    },
 
    computed: {
        ...mapState([
            'token'
        ])
    },
}
</script>