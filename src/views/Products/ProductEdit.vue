<template>
  <div>
    <div v-if="product">
      <h1 class="mb-5">Edit product</h1>
      <ProductAddEditForm
        :product="product"
        @refreshView="fetchProduct"
        v-if="!isLoading"
      />
      <p v-else>Loading...</p>
    </div>
    <div v-else>
      <h1>Product doesn't exist</h1>
    </div>
  </div>
</template>
<script>
import ProductAddEditForm from "@/components/Product/ProductAddEditForm";
import axios from "axios";
import { ref } from "@vue/composition-api";
export default {
  components: {
    ProductAddEditForm,
  },

  setup(props, context) {
    const route = context.root.$route;
    const id = route.params.id;
    const product = ref(null);
    const isLoading = ref(false);

    const fetchProduct = () => {
      isLoading.value = true;
      axios
        .get("http://localhost:3000/products/" + id)
        .then((response) => {
          product.value = response.data;
        })
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    fetchProduct();
    return {
      product,
      isLoading,
      fetchProduct,
    };
  },
};
</script>
