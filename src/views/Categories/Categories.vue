<template>
  <div>
    <h1 class="mb-5">List of categories</h1>
    <CategoryList />
  </div>
</template>
<script>
import CategoryList from "@/components/Category/CategoryList";
export default {
  components: {
    CategoryList,
  },
};
</script>
