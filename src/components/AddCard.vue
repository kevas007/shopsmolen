<template>
<div class="mt-10">

    <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add products</h2>
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
            <div class=" mt-4 sm:grid-cols-2 flex-row">
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="username">Name</label>
                    <input id="username" v-model="names" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                </div>
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="area">Description</label>
                   <textarea name="" v-model="description" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" id="area" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="username">Price</label>
                    <input id="username" v-model="price" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                </div>
                 <div>
                        <label
                            class="text-gray-700 dark:text-gray-200"
                            for="avatar"
                        >Choose a picture</label>

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
                <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
            </div>
        </form>
    </section>
</div>

</template>

<script>
import axios from "axios"
import { mapState } from 'vuex'
export default{
  data () {
    return {
        names: '',
        description: '',
        price: '',
        errors: [],
        image: null
    }
},
computed: {
    ...mapState([
            'token'
        ])
},
methods: {
        previewFiles(event) {
            this.image = event.target.files[0]
            console.log(this.image)
        },
    submit() {
        const formData = new FormData()
        formData.append('name', this.names)
        formData.append('description', this.description)
        formData.append('price', this.price)
        formData.append('cover', this.image)
        axios.post('https://api-moshop.molengeek.pro/api/v1/product', formData,
        {
            headers: {
            "Authorization": "Bearer " + this.token,
            }
        })
            .then(response => {
                console.log(response)
                this.$router.push('/shop')
            })
            .catch(error => {
                this.errors.push(error.message)
            })
    }

},

}

</script>