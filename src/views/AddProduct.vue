<template>
  <div>
    <h1>Add new product</h1>
    <ProductAddEditForm :product="product" />
  </div>
</template>
<script>
import ProductAddEditForm from "../components/ProductAddEditForm";
export default {
  data: () => {
    return {
      product: {
        name: "",
        description: "",
        thumbnail: "",
      },
    };
  },
  components: {
    ProductAddEditForm,
  },
};
</script>
