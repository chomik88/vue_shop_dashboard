<template>
  <div>
    <h1>Add new category</h1>
    <CategoryAddEditForm :category="category" />
  </div>
</template>
<script>
import CategoryAddEditForm from "@/components/CategoryAddEditForm";
export default {
  data() {
    return {
      category: {
        name: "",
      },
    };
  },
  components: {
    CategoryAddEditForm,
  },
};
</script>
