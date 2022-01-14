<template>
  <div class="text-start">
    <h2>{{ category.name }}</h2>
    <b-form @submit.prevent="id ? editCategory() : addCategory()">
      <b-form-group label="Category name">
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          placeholder="Enter category name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="mt-4">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
import axios from "axios";
import { reactive } from "@vue/composition-api";
export default {
  props: ["category"],
  setup(props, context) {
    const router = context.root.$router;
    const route = context.root.$route;
    const id = route.params.id;
    const form = reactive({
      name: props.category.name,
    });

    const addCategory = () => {
      axios
        .post("http://localhost:3000/categories/", form)
        .then(router.push({ path: "/categories" }))
        .catch((error) => console.error(error));
    };
    const editCategory = () => {
      axios
        .patch("http://localhost:3000/categories/" + id, form)
        .then(() => {
          refreshView();
        })
        .catch((error) => console.error(error));
    };
    const refreshView = () => {
      context.emit("refreshView");
    };
    return {
      form,
      id,
      addCategory,
      editCategory,
    };
  },
};
</script>
