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
    </b-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      tableFields: ["_id", "name", "thumbnail"],
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
