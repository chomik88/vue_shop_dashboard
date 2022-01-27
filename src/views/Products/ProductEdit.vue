<template>
  <div>
    <b-row>
      <b-col md="12" class="text-start mb-4">
        <b-button @click="goBack()">Go back</b-button>
      </b-col>
    </b-row>
    <div v-if="product">
      <h1 class="mb-5">Edit product</h1>
      <b-form v-if="!isLoading">
        <b-tabs class="text-start">
          <b-tab title="Product main features">
            <ProductAddEditForm
              :product="product"
              @refreshView="fetchProduct"
              class="mt-4"
            />
          </b-tab>
          <b-tab title="Product attributes">
            <ProductAttributesEditForm />
          </b-tab>
        </b-tabs>
      </b-form>
      <p v-else>Loading...</p>
    </div>
    <div v-else>
      <h1>Product doesn't exist</h1>
    </div>
  </div>
</template>
<script>
import ProductAddEditForm from "@/components/Product/ProductAddEditForm";
import ProductAttributesEditForm from "../../components/Product/ProductAttributesEditForm.vue";
import axios from "axios";
import { ref } from "@vue/composition-api";
export default {
  components: {
    ProductAddEditForm,
    ProductAttributesEditForm,
  },

  setup(props, context) {
    const router = context.root.$router;
    const route = context.root.$route;
    const id = route.params.id;
    const product = ref(null);
    const isLoading = ref(false);

    const fetchProduct = () => {
      isLoading.value = true;
      axios
        .get("http://localhost:3000/products/" + id)
        .then((response) => {
          return (product.value = response.data);
        })
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          console.log(product.value);
          isLoading.value = false;
        });
    };

    const goBack = () => {
      router.push("/products");
    };

    fetchProduct();
    return {
      product,
      isLoading,
      fetchProduct,
      goBack,
    };
  },
};
</script>
