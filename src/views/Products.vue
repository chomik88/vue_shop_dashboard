<template>
  <div>
    <h1 class="mb-5">List of products</h1>
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList";

export default {
  name: "Home",
  components: {
    ProductList,
  },
};
</script>
