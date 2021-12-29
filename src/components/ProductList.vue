<template>
  <div>
    <b-button
      class="d-flex justify-content-start"
      variant="primary"
      @click="goToAddProduct"
      >Add product</b-button
    >
    <b-table
      striped
      bordered
      borderless
      small
      hover
      :items="products"
      :fields="tableFields"
      v-if="products.length > 0"
      class="mt-4"
    >
      <template #cell(thumbnail)="data">
        <b-img :src="data.value"></b-img>
      </template>
      <template #cell(actions)="row">
        <div class="buttons-wrapper">
          <b-button
            variant="primary"
            router-tag="button"
            @click="editProduct(row.item._id)"
            >Edit</b-button
          >
          <b-button
            variant="danger"
            router-tag="button"
            @click="deleteProduct(row.item._id)"
            >Remove</b-button
          >
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      tableFields: ["name", "thumbnail", "actions"],
      products: [],
    };
  },
  methods: {
    fetchProducts() {
      axios.get("http://localhost:3000/products").then((response) => {
        this.products = response.data;
      });
    },
    editProduct(id) {
      this.$router.push({ path: `product/${id}` });
    },
    deleteProduct(id) {
      axios.delete("http://localhost:3000/products/" + id).then(() => {
        this.fetchProducts();
      });
    },
     goToAddProduct() {
      this.$router.push({ path: "new-product" });
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
<style lang="scss">
.table {
  img {
    width: 80px;
    height: auto;
  }

  .buttons-wrapper {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  td {
    vertical-align: middle;
  }
}
</style>
