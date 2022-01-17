<template>
    <div class="mt-10">
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2
                class="text-lg font-semibold text-gray-700 capitalize dark:text-white"
            >Account settings</h2>

            <form @submit.prevent="submit">
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
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
                                    <span
                                        class="font-semibold text-green-500 dark:text-red-400"
                                    >Succes</span>
                                    <p
                                        class="text-sm text-gray-600 dark:text-gray-200"
                                        v-for="succes in success"
                                        :key="succes"
                                    >{{ succes }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label
                            class="text-gray-700 dark:text-gray-200"
                            for="emailAddress"
                        >Email Address</label>
                        <input
                            id="emailAddress"
                            v-model="emailAddress"
                            type="email"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="password">Password</label>
                        <input
                            id="password"
                            v-model="password"
                            type="password"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                </div>

                <div class="flex justify-end mt-6">
                    <button
                        class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >Save</button>
                </div>
            </form>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
        return {
            errors: [],
            emailAddress: null,
            password: null,
            success: [],
            // token:null
        }
    },

    methods: {
        submit() {
            let formData = new FormData();
            formData.append("email", this.emailAddress);
            formData.append("password", this.password);


            axios.post('https://api-moshop.molengeek.pro/api/v1/login', formData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                }
            }
            )
                .then(res => {
                    if (res.data.status == '200') {
                        console.log("token : " + res.data.data.token);
                        localStorage.setItem('token', JSON.stringify(res.data.data.token));

                        // localStorage.setItem('user', JSON.stringify(res.data.user));
                        this.success.push(res.data.message)
                        this.$router.push('/');
                        this.$store.dispatch('userConnected')
                        this.$store.dispatch('getUser');
                        // this.$store.commit('userConnected', res.data.data.token)
                        this.$store.dispatch('getPersShop')

                    } else {
                        console.log(res.data.error);
                        this.errors.push(res.data.message);
                    }
                    console.log(res.data.status)
                }).catch(err => {
                    this.errors.push(err.data.message)
                    console.log(err);
                })

        }
    }
}

</script>