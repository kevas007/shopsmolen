<template>
    <div>
        <div>
            <div
                class="flex m-10 max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
            >
                <div
                    class="w-2/4 bg-cover"
                    :style="{ 'background-image': 'url(https://api-moshop.molengeek.pro' + shop.cover_path + ')' }"
                ></div>

                <div class="w-2/3 p-4 md:p-4">
                    <h1 class="text font-bold text-gray-800 dark:text-white">{{ shop.name }}</h1>

                    <p
                        class="mt-2 text-sm text-gray-600 dark:text-gray-400"
                    >{{ shop.description.substring(0, 15) + '...' }}</p>
                    <div class="flex justify-between mt-3 item-center">
                        <h1
                            class="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl"
                        >${{ shop.price }}</h1>
                        <router-link
                            :to="{
                                name: 'ShowCard',
                                params: {
                                    id: shop.id,
                                },
                            }"
                        >
                            <button
                                class="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
                            >Show</button>
                        </router-link>
                        <button
                            @click="adds"
                            class="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
                        >Add</button>
                    </div>
                    <div v-if="shows">
                        <div
                            class="flex justify-between align-center item-center w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        >
                            <span class="pt-4">{{ quantity }}</span>
                            <div class="flex flex-col items-center">
                                <button
                                    @click="plus"
                                    class="px-2 mt-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
                                >+</button>
                                <button
                                    @click="moins"
                                    class="px-2 mt-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
                                >-</button>
                            </div>
                        </div>
                        <button
                            @click="send"
                            class="px-2 mt-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
                        >Add to Panier</button>
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
    props: {
        shop: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            quantity: 1,
            shows: false,
        };
    },
    methods: {

        adds() {
            this.shows = !this.shows;
        },
        plus() {
            this.quantity++;
        },
        moins() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        send() {
            let products = {
                product: this.shop.id,
                quantity: this.quantity
            };
            console.log(products);
            axios.post("https://api-moshop.molengeek.pro/api/v1/cart", products, {
                headers: {
                    Authorization: "Bearer " + this.token

                }
            }).then(response => {
                this.shows = false;
                console.log(response);
            })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    computed: {
        ...mapState([
            "token"
        ])
    }
}
</script>