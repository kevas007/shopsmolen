<template>
    <div class="mt-10 relative" v-if="setUsers">
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
                :src="`https://api-moshop.molengeek.pro${setUsers.profile.picture_path}`"
            />
            <input
                v-show="userEdit"
                type="file"
                @change="previewFiles"
                id="avatar"
                name="avatar"
                accept=".png, .jpeg, .jpg"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                multiple
            />
            <!-- <div class=" absolute top-60 pincel">
                    <button  @click="editPicture"  >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 bg-white rounded-xl" viewBox="0 0 20 20" fill="currentColor">
  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
</svg>
                    </button>
            </div>-->
            <div class="flex items-center px-6 py-3 bg-gray-900">
                <button @click="edit" to="/userEdit">
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
                <h1 class="mx-3 text-lg font-semibold text-white">Edit</h1>
                <div v-show="userEdit" class="flex ml-36 flex-end">
                    <button
                        @click="submit"
                        class="w-full px-4 flex  py-1 text-white transition-colors duration-200 transform bg-blue-600 rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-blue-500 focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
                    v-show="!userEdit"
                    class="text-xl font-semibold text-gray-800 dark:text-white"
                >Nom: {{ setUsers.profile.lastname }}</h1>
                <input
                    v-show="userEdit"
                    id="username"
                    v-model="firstName"
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                <!--
                <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 11H10V13H14V11Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"/>
                    </svg>

                    <h1 class="px-2 text-sm">Meraki UI</h1>
                </div>-->

                <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <!-- <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
                    </svg>-->

                    <h1
                        v-show="!userEdit"
                        class="px-2 text-sm"
                    >Prenom: {{ setUsers.profile.firstname }}</h1>
                    <input
                        v-show="userEdit"
                        id="lastName"
                        v-model="lastName"
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                </div>
                <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <svg
                        class="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                        />
                    </svg>

                    <h1 class="px-2 text-sm">{{ setUsers.email }}</h1>
                </div>
                <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <!-- <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
                    </svg>-->

                    <h1 class="px-2 text-sm">created_at: {{ setUsers.profile.created_at }}</h1>
                </div>
                <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <!-- <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
                    </svg>-->

                    <h1 class="px-2 text-sm">updated_at: {{ setUsers.profile.updated_at }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
export default {
    data() {
        return {
            userEdit: false,
            firstName: null,
            lastName: null,
            image: null,
            success: [],
            errors: [],
        }
    },
    methods: {
        edit() {
            this.userEdit = !this.userEdit
        },
        previewFiles(event) {
            this.image = event.target.files[0]
        },
        submit() {
            this.success = []
            const formData = new FormData();
            formData.append('picture', this.image);
            let editUser = {
                firstname: this.firstName,
                lastname: this.lastName
            }
            console.log(formData);
            axios.put('https://api-moshop.molengeek.pro/api/v1/user/picture', formData, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                }
            }
            ).then(response => {
                this.success.push(response.data.message)
                console.log(response);
            }).catch(err => {
                this.errors.push(err.data.message)
                console.log(err);
            });
            axios.put('https://api-moshop.molengeek.pro/api/v1/user', editUser, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                }
            }
            ).then(res => {
                this.success.push(res.data.message)
                console.log(res);
            }).catch(err => {
                this.errors.push(err.data.message)
                console.log(err);
            });
            this.userEdit =false
        }
    },

    computed: {
        ...mapGetters([
            'setUsers'
        ]),
        ...mapState([
            'token'
        ])
    },

}
</script>
<style scoped>
.pincel {
    right: 39%;
}
</style>