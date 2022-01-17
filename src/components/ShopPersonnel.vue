<template>
  <div v-if="setShopPersonals">
    <div class="hello container mt-10 p-1">
      <p>{{ setShopPersonals.name }}</p>
      <div class="flex jusitfy-center item-center align-center">
        <button
          @click="addShop"
          class="flex flex-row jusitfy-center item-center align-center px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Add Card</span>
        </button>
      </div>
      <div>
        <div class="grid grid-cols-4 gap-4">
          <Products v-for="shop in   setShopPersonals.products" :key="shop.id" :shop = "shop" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import Products from './Products.vue';
export default {
    mounted() {
        this.$store.dispatch("getPersShop");
    },
    computed: {
        ...mapGetters([
            "setShopPersonals"
        ]),

    },
    methods: {
 addShop() {
            this.$router.push("/addCard");
        },
    },
    components: { Products }
}
</script>