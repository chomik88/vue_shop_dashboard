<template>
  <div>
    <b-row>
      <b-col md="12" class="text-start mb-4">
        <b-button @click="goBack()">Go back</b-button>
      </b-col>
    </b-row>
    <div v-if="product">
      <h1 class="mb-5">Edit product</h1>
      <b-form v-if="!isLoading" class="text-start">
        <b-button @click="onProductFormSubmit()" class="mb-4">Submit</b-button>
        <b-tabs>
          <b-tab title="Product main features">
            <ProductAddEditForm
                :product="product"
                @refreshView="fetchProduct"
                @productFormDataCreated="addProductFormData"
                :formSended="formSended"
                class="mt-4"
            />
          </b-tab>
          <b-tab title="Product attributes">
            <ProductAttributesEditForm
                :definedAttributes="product.attributes"
                :formSended="formSended"
                @productAttributesCreated="addProductAttributes"
            />
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
import {ref} from "@vue/composition-api";

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
    const formData = ref(null);
    const formSended = ref(false)

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

    const onProductFormSubmit = () => {
      formSended.value = true;
    }

    const addProductFormData = (e) => {
      formData.value = e;
    }

    const addProductAttributes = (e) => {
      formData.value.append('attributes', JSON.stringify(e))
      editProduct(formData.value)
    }

    const goBack = () => {
      router.push("/products");
    };

    const editProduct = (data) => {
      axios
          .patch("http://localhost:3000/products/" + id, data)
          .then(() => {
            console.log("Update request");
          })
          .catch((error) => console.error(error));
    };


    fetchProduct();
    return {
      product,
      formSended,
      isLoading,
      fetchProduct,
      goBack,
      editProduct,
      onProductFormSubmit,
      addProductFormData,
      addProductAttributes
    };
  },
};
</script>
