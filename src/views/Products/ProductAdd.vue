<template>
  <div>
    <h1 class="mb-5">Add new product</h1>
    <ProductAddEditForm :product="product" />
  </div>
</template>
<script>
import ProductAddEditForm from "@/components/Product/ProductAddEditForm";
import { reactive } from "@vue/composition-api";
export default {
  components: {
    ProductAddEditForm,
  },
  setup() {
    const product = reactive({
      name: "",
      description: "",
      thumbnail: "",
    });
    return {
      product,
    };
  },
};
</script>
