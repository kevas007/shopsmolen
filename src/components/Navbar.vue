<template>
    <div>
        <nav class="bg-white shadow relative dark:bg-gray-800 mt-15">
            <div class="container px-6 py-3 mx-auto">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <router-link
                                to="/"
                                name="Home"
                                class="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                            >Home</router-link>
                        </div>

                        <!-- Mobile menu button -->
                        <div class="flex md:hidden">
                            <button
                                type="button"
                                class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                aria-label="toggle menu"
                            >
                                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                    <path
                                        fill-rule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
                    <div class="items-center md:flex">
                     
                        <div v-show="token == null" class="flex items-center py-2 -mx-1 md:mx-0">
                            <router-link
                                class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto"
                                to="/login"
                            >Login</router-link>
                            <router-link
                                class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto"
                                to="/register"
                            >Register</router-link>
                        </div>
                        <!-- deconnection plus profile -->
                        <div v-show="token != null">
                            <div class="flex items-center mt-4 md:mt-0">
                                <router-link
                                class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                                to="/boutique"
                            >Boutiques</router-link>
                            <router-link
                                class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                                to="/commandes"
                            >Commandes</router-link>
                                <router-link
                                    class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                                    to="/panier"
                                >Panier</router-link>
                                <router-link
                                    class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                                    to="/shop"
                                    name="Shop"
                                >Shop</router-link>
                                <button
                                    class="hidden mx-4 text-gray-600 transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                                    aria-label="show notifications"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <!-- <p
                                        class="text-xs absolute top-0 px-1 bg-red-500 rounded-full left-3"
                                    >{{ commande.length ? commande.length : ""}}</p> -->
                                </button>

                                <button
                                    type="button"
                                    class="flex items-center focus:outline-none"
                                    aria-label="toggle profile dropdown"
                                    @click="modalshow"
                                >
                                    <div
                                        v-if="setUsers"
                                        class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full"
                                    >
                                        <img
                                            v-if="setUsers.profile"
                                            :src="`https://api-moshop.molengeek.pro${setUsers.profile.picture_path}`"
                                            class="object-cover w-full h-full"
                                            alt="avatar"
                                        />
                                    </div>
                                </button>
                                <div
                                    v-if="showProfile"
                                    class="absolute flex flex-col max-w-2xl px-10 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 top-16 right-1"
                                >
                                    <p>
                                        User :
                                        <span
                                            class="text-blue-600"
                                        >{{ setUsers.profile.lastname.substring(0, 5) }}</span>
                                    </p>
                                    <button @click="users"
                                        class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                                    >Profile</button>
                                    <button
                                        class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                        @click="logout"
                                    >logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            showProfile: false,
            commande: localStorage.getItem('commandes')

        }
    },

    computed: {
        ...mapState([
            'token'
        ]),
        ...mapGetters([
            'setUsers'
        ])


    },


    methods: {


        logout() {
            this.showProfile = false
            this.$router.push('/login')
            this.$store.commit('logout')
            localStorage.clear();


        },
        modalshow() {
            this.showProfile = !this.showProfile
        },
        users() {
            this.$router.push('/users')
            this.showProfile = false
        }


    }
}
</script>


<!-- Require css -->
    <style>
.scroll-hidden::-webkit-scrollbar {
    height: 0px;
    background: transparent; /* make scrollbar transparent */
}
</style>

