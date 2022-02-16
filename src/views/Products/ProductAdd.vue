<template>
  <div>
    <b-row>
      <b-col md="12" class="text-start mb-4">
        <b-button @click="goBack()">Go back</b-button>
      </b-col>
    </b-row>
    <div>
      <h1 class="mb-5">Add new product</h1>
      <b-form class="text-start">
        <b-button @click="onProductFormSubmit()" class="mb-4">Submit</b-button>
        <b-tabs class="text-start">
          <b-tab title="Product main features">
            <ProductAddEditForm :product="product" :formSended="formSended" class="mt-4"
                                @productFormDataCreated="addProductFormData"/>
          </b-tab>
          <b-tab title="Product attributes">
            <ProductAttributesEditForm :formSended="formSended"
                                       @productAttributesCreated="addProductAttributes"/>
          </b-tab>
        </b-tabs>
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ProductAddEditForm from "@/components/Product/ProductAddEditForm";
import ProductAttributesEditForm from "../../components/Product/ProductAttributesEditForm.vue";
import {ref} from "@vue/composition-api";

export default {
  components: {
    ProductAddEditForm,
    ProductAttributesEditForm,
  },
  setup(props, context) {
    const router = context.root.$router;
    const product = ref({
      name: "",
      description: "",
      thumbnail: "",
    });
    const formData = ref(null);
    const formSended = ref(false)

    const goBack = () => {
      router.push("/products");
    };

    const addProduct = (data) => {
      axios
          .post("http://localhost:3000/products", data)
          .then(() => router.push({path: "/products"}))
          .catch((error) => console.error(error));
    };

    const onProductFormSubmit = () => {
      formSended.value = true;
    }
    const addProductFormData = (e) => {
      formData.value = e;
    }

    const addProductAttributes = (e) => {
      formData.value.append('attributes', JSON.stringify(e))
      addProduct(formData.value)
    }
    return {
      product,
      formSended,
      goBack,
      addProduct,
      onProductFormSubmit,
      addProductFormData,
      addProductAttributes
    };
  },
};
</script>
