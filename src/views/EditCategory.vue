<template>
  <div v-if="category">
    <h1>Edit category</h1>
    <CategoryAddEditForm :category="category" @refreshView="fetchCategory"/>
  </div>
</template>
<script>
import axios from "axios";
import CategoryAddEditForm from "@/components/CategoryAddEditForm";
export default {
  data() {
    return {
      id: this.$route.params.id,
      category: null,
      form: {
        name: "",
      },
    };
  },
  components: {
    CategoryAddEditForm,
  },
  methods: {
    fetchCategory() {
      axios
        .get("http://localhost:3000/categories/" + this.id)
        .then((response) => {
          console.log(response);
          this.category = response.data;
        });
    },
  },
  created() {
    this.fetchCategory();
  },
};
</script>
