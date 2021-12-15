<template>
  <div>
    <b-table
      striped
      bordered
      borderless
      small
      hover
      :items="products"
      :fields="tableFields"
    >
      <template #cell(thumbnail)="data">
        <b-img :src="data.value"></b-img>
      </template>
      <template #cell(actions)="row">
        <b-button
          class="btn btn-primary"
          router-tag="button"
          @click="editProduct(row.item._id)"
          >Edit</b-button
        >
      </template>
    </b-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      tableFields: ["_id", "name", "thumbnail", "actions"],
      products: [],
    };
  },
  methods: {
    fetchProducts() {
      axios.get("http://localhost:3000/products").then((response) => {
        console.log(response);
        this.products = response.data;
      });
    },
    editProduct(id) {
      console.log(id);
      this.$router.push({ path: `product/${id}` });
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
}
</style>
