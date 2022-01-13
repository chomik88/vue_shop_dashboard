<template>
  <div class="text-start">
    <h1 class="mb-5">Add new category</h1>
    <b-button class="mb-4" @click="goBack()"> Go back </b-button>
    <CategoryAddEditForm :category="category" />
  </div>
</template>
<script>
import CategoryAddEditForm from "@/components/Category/CategoryAddEditForm";
export default {
  setup(props, context) {
    const router = context.root.$router;
    const category = {
      name: "",
    }
    const goBack = () => {
     router.push("/categories");
    };
    return {
      category,
      goBack,
    };
  },
  components: {
    CategoryAddEditForm,
  },
};
</script>
