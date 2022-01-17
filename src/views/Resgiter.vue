<template>
    <div class="about mt-10">
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Resgiter</h2>

            <form @submit.prevent="submit">
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
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email</label>
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
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="firstname">FirstName</label>
                        <input
                            id="firstname"
                            v-model="firstName"
                            type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="lastname">Last Name</label>
                        <input
                            v-model="lastName"
                            id="lastname"
                            type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label
                            class="text-gray-700 dark:text-gray-200"
                            for="avatar"
                        >Choose a profile picture:</label>

                        <input
                            type="file"
                            @change="previewFiles"
                            id="avatar"
                            name="avatar"
                            accept=".png, .jpeg, .jpg"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            multiple
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
    name: 'Register',
    data() {
        return {
            errors: [],
            firstName: null,
            lastName: null,
            emailAddress: null,
            password: null,
            image: null
        };
    },
    methods: {
        previewFiles(event) {
            this.image = event.target.files[0]
            console.log(this.image)
        },
        submit: function () {
            this.errors = [];
            // if (this.firstName && this.lastName && this.emailAddress && this.password && this.images) {
            const formData = new FormData();
            formData.append("firstname", this.firstName);
            formData.append('lastname', this.lastName);
            formData.append("email", this.emailAddress);
            formData.append("password", this.password);
            formData.append('picture', this.image);
            console.log(formData);


            axios.post('https://api-moshop.molengeek.pro/api/v1/register', formData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                }
            })
                .then(res => {
                    if (res.data.status == '200') {
                        console.log(res.data.data);
                        // localStorage.setItem('token', res.data.data.token);
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        this.$store.dispatch('getUser');
                        this.$store.dispatch('getPersShop')
                        this.$router.push('/');
                    } else {
                        console.log(res.data.errors);
                        this.errors = res.data.errors;
                    }
                })
            // this.$store.dispatch('addUser',formData)
            // console.log( this.$store.dispatch('addUser',this.formData))

        }
        //     if (!this.firstName) {
        //         this.errors.push('First name is required');
        //     }
        //     if (!this.lastName) {
        //         this.errors.push('Last name is required');
        //     }
        //     if (!this.emailAddress) {
        //         this.errors.push('Email required.');
        //     } else if (!this.validEmail(this.emailAddress)) {
        //         this.errors.push('Valid email required.');
        //     }
        //     if (!this.password) {
        //         this.errors.push('Password is required');
        //     }
        //     // if(!this.images){
        //     //       this.errors.push('Images is required');
        //     // }
        //     if (!this.errors.length) {

        //         return true;
        //     }
        // },
        // validEmail: function (email) {
        //     var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(email);
        // }

    },

}

</script>