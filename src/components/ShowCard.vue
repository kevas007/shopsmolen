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
            <input
                v-show="cardEdit"
                type="file"
                @change="previewFiles"
                id="avatar"
                name="avatar"
                accept=".png, .jpeg, .jpg"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                multiple
            />
            <div class="flex items-center px-6 py-3 bg-gray-900">
                <button @click="edit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 bg-white rounded-xl"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                    </svg>
                </button>
                <h1  class="mx-3 text-lg font-semibold text-white">Edit</h1>
                <div v-show="cardEdit " class="flex ml-36 flex-end">
                    <button
                        @click="submit"
                        class="w-full px-4 flex py-1 text-white transition-colors duration-200 transform bg-blue-600 rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-blue-500 focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mx-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <span class="mx-1">Upload</span>
                    </button>
                </div>
            </div>

            <div class="px-6 py-4">
                <h1
                    class="text-xl font-semibold text-gray-800 dark:text-white"
                >name : {{ shop.name }}</h1>
                <input
                    v-show="cardEdit"
                    id="username"
                    v-model="names"
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />

                <p
                    class="py-2 text-gray-700 dark:text-gray-400"
                >Description : {{ shop.description }}</p>
                <textarea
                    v-show="cardEdit"
                    id="username"
                    v-model="description"
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                ></textarea>
                <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <h1 class="px-2 text-sm">price : $ {{ shop.price }}</h1>
                    <input
                        v-show="cardEdit"
                        id="username"
                        v-model="price"
                        type="number"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                </div>
                <div class="mt-10">
                    <button
                        @click="deleted"
                        class="px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                    >Delete</button>
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
            names: '',
            description: '',
            price: '',
            shop: null,
            success: [],
            errors: [],
            cardEdit: false,
            image: null,
        }
    },
    methods: {
        edit() {
            this.cardEdit = !this.cardEdit
        },
        previewFiles(event) {
            this.image = event.target.files[0]
        },
        submit() {
            let updates = {
                name: this.names,
                description: this.description,
                price: this.price,
            }
            const formData = new FormData();
            formData.append('cover', this.image);
            axios
                .put(`https://api-moshop.molengeek.pro/api/v1/product/${this.id}`, updates, {
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })
                .then((response) => {
                    this.success.push(response.data.message)
                    this.errors = []
                })
                .catch((error) => {
                    this.errors.push(error.data.message)
                    this.success = []
                })
            axios
                .put(`https://api-moshop.molengeek.pro/api/v1/product/${this.id}/picture`, formData, {
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })
                .then((response) => {
                    this.success.push(response.data.message)
                    this.errors = []
                })
                .catch((error) => {
                    this.errors.push(error.data.message)
                    this.success = []
                })
        },
        deleted() {
            axios.delete(`https://api-moshop.molengeek.pro/api/v1/product/${this.id}`, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            }).then((response) => {

                this.success.push(response.data.message)
                this.$router.push('/shop')
                console.log(response)
            })
        },

    },
    props: {
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