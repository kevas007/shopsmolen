<template>
  <div v-if="setShops !=null">
    <!-- deafult shop -->
    <div class="hello container mt-10 p-1">
      <p>{{ setShops.name }}</p>
      <div class="grid grid-cols-4 gap-4">
        <div class v-for="shop in   setShops.products" :key="shop.id">
          <div
            class="flex m-10 max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            <div
              class="w-2/6 bg-cover"
              :style="{ 'background-image': 'url(https://api-moshop.molengeek.pro/' + shop.cover_path + ')' }"
            ></div>

            <div class="w-2/3 p-4 md:p-4">
              <h1 class="text font-bold text-gray-800 dark:text-white">{{ shop.name }}</h1>

              <p
                class="mt-2 text-sm text-gray-600 dark:text-gray-400"
              >{{ shop.description.substring(0, 50) + '...' }}</p>
              <div class="flex justify-between mt-3 item-center">
                <h1
                  class="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl"
                >${{ shop.price }}</h1>
                <button
                  class="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
                >Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created() {
  },
  name: 'HelloWorld',
  mounted() {

    this.$store.dispatch('getShop')


  },
  
  computed: {
    ...mapGetters([
      'setShops'
    ]),
   
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
