<template>
  <div v-if="category">
    <h1>Edit category</h1>
    <CategoryAddEditForm :category="category" @refreshView="fetchCategory" />
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
    const fetchCategory = () => {
      axios.get("http://localhost:3000/categories/" + id).then((response) => {
        console.log(response);
        category.value = response.data;
      });
    };
    fetchCategory();
    return {
      id,
      category,
      fetchCategory,
    };
  },
};
</script>
