<template>
  <div>
    <h1 class="mb-5">Add new product</h1>
    <b-row>
      <b-col md="12" class="text-start mb-4">
        <b-button @click="goBack()">Go back</b-button>
      </b-col>
    </b-row>
    <b-tabs class="text-start">
      <b-tab title="Product main features">
        <ProductAddEditForm :product="product" class="mt-4" />
      </b-tab>
      <b-tab title="Product attributes">
        <ProductAttributesEditForm />
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import ProductAddEditForm from "@/components/Product/ProductAddEditForm";
import ProductAttributesEditForm from "../../components/Product/ProductAttributesEditForm.vue";
import { reactive } from "@vue/composition-api";
export default {
  components: {
    ProductAddEditForm,
    ProductAttributesEditForm,
  },
  setup(props, context) {
    const router = context.root.$router;
    const product = reactive({
      name: "",
      description: "",
      thumbnail: "",
    });

    const goBack = () => {
      router.push("/products");
    };
    return {
      product,
      goBack,
    };
  },
};
</script>
