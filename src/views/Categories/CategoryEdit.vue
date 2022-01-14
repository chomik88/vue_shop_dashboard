<template>
  <div v-if="category">
    <h1>Edit category</h1>
    <CategoryAddEditForm
      :category="category"
      @refreshView="fetchCategory"
      v-if="!isLoading"
    />
    <p v-else>Loading...</p>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "@vue/composition-api";
import CategoryAddEditForm from "@/components/Category/CategoryAddEditForm";
export default {
  components: {
    CategoryAddEditForm,
  },
  setup(props, context) {
    const route = context.root.$route;
    const id = route.params.id;
    const category = ref(null);
    const isLoading = ref(false);
    const fetchCategory = () => {
      isLoading.value = true;
      axios
        .get("http://localhost:3000/categories/" + id)
        .then((response) => {
          console.log(response);
          category.value = response.data;
        })
        .catch((error) => console.error(error.message))
        .finally(() => {
          isLoading.value = false;
        });
    };
    fetchCategory();
    return {
      id,
      category,
      isLoading,
      fetchCategory,
    };
  },
};
</script>
