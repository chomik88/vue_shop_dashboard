<template>
  <div>
    <b-button
      class="d-flex justify-content-start"
      variant="primary"
      @click="goToAddCategory"
      >Add category</b-button
    >
    <b-table
      striped
      bordered
      borderless
      small
      hover
      :items="categories"
      :fields="tableFields"
      v-if="categories.length > 0"
      class="mt-4"
    >
      <template #cell(actions)="row">
        <div class="buttons-wrapper">
          <b-button
            variant="primary"
            router-tag="button"
            @click="editCategory(row.item._id)"
            >Edit</b-button
          >
          <b-button
            variant="danger"
            router-tag="button"
            @click="deleteCategory(row.item._id)"
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
      tableFields: ["name", "actions"],
      categories: [],
    };
  },
  methods: {
    fetchCategories() {
      axios.get("http://localhost:3000/categories").then((response) => {
        this.categories = response.data;
      });
    },
    editCategory(id) {
      this.$router.push({ path: `category/${id}` });
    },
    deleteCategory(id) {
      axios.delete("http://localhost:3000/categories/" + id).then(() => {
        this.fetchCategories();
      });
    },
    goToAddCategory() {
      this.$router.push({ path: "new-category" });
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
