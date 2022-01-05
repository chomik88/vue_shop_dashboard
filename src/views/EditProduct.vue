<template>
  <div v-if="product">
    <h1>Edit product</h1>
    <ProductAddEditForm :product="product" @refreshView="fetchProduct"/>
  </div>
</template>
<script>
import ProductAddEditForm from "../components/ProductAddEditForm";
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: null,
      form: {
        name: "",
        description: "",
      },
    };
  },
  components: {
    ProductAddEditForm,
  },
  methods: {
    fetchProduct() {
      axios
        .get("http://localhost:3000/products/" + this.id)
        .then((response) => {
          this.product = response.data;
        });
    },
    editProduct(row) {
      console.log(row);
    },
  },
  created() {
    this.fetchProduct();
  },
};
</script>
