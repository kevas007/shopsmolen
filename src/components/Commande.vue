<template>
    <div class="mt-10" v-if="lists">
        <a @click="$router.go(-1)">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
        </a>
        <div class="grid grid-cols-4 gap-4 mt-10">
            <div
                class="flex flex-col items-center justify-center max-w-sm mx-auto"
                v-for="shop in lists.order_items"
                :key="shop.id"
            >
                <div
                    v-if="shop.product"
                    class="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                    :style="{ 'background-image': 'url(https://api-moshop.molengeek.pro' + shop.product.cover_path + ')' }"
                ></div>

                <div
                    class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800"
                >
                    <h3
                        class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white"
                    >{{ shop.product.name }}</h3>
                    <div
                        class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700"
                    >
                        <span
                            class="font-bold text-gray-800 dark:text-gray-200"
                        >Price: $ {{ shop.product.price }}</span>

                        <span
                            class="font-bold text-gray-800 dark:text-gray-200"
                        >Quantity : {{ shop.quantity }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import { mapState } from 'vuex'
export default {
    data() {
        return {
            lists: null
        }
    },
    props: {
        id: {
            type: [Number, String],
            required: true
        }
    },
    mounted() {
        axios.get('https://api-moshop.molengeek.pro/api/v1/order/' + this.id, {
            headers: {
                "Authorization": "Bearer " + this.token,
            }
        })
            .then(response => {
                this.lists = response.data.data
            })
            .catch(error => {
                console.log(error)
            })
    },
    computed: {
        ...mapState([
            'token'
        ]),
    },
}
</script>