<template>
  <div>
    <b-form
      @submit.prevent="id ? editCategory() : addCategory()"
      class="text-start"
    >
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
export default {
  data() {
    return {
      id: this.$route.params.id,
      form: {
        name: this.category.name,
      },
    };
  },
  props: ["category"],
  methods: {
    addCategory: function () {
      axios
        .post("http://localhost:3000/categories", this.form)
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
    },
    editCategory: function () {
      axios
        .patch("http://localhost:3000/categories/" + this.id, this.form)
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
    },
  },
};
</script>
