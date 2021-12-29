<template>
  <b-row>
    <b-col md="4" class="text-start">
      <b-img fluid :src="product.thumbnail" alt=""></b-img>
      <b-form>
        <b-form-group label="Thumbnail">
          <b-form-input
            id="input-thumbnail"
            v-model="form.thumbnail"
            type="text"
            placeholder="Enter thumbnail url"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-col>
    <b-col class="text-start">
      <h1>{{ product.name }}</h1>
      <b-form @submit.prevent="id ? editProduct() : addProduct()">
        <b-form-group label="Product name" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="form.name"
            type="text"
            placeholder="Enter product name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Product description"
          label-for="textarea-description"
          class="mt-3"
        >
          <b-form-textarea
            id="textarea-description"
            v-model="form.description"
            placeholder="Enter product description"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mt-4">Submit</b-button>
      </b-form>
    </b-col>
    <pre>
              {{ form }}
          </pre
    >
  </b-row>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      form: {
        name: this.product.name,
        description: this.product.description,
        thumbnail: this.product.thumbnail,
      },
    };
  },
  props: ["product"],
  methods: {
    addProduct: function () {
      axios
        .post("http://localhost:3000/products", this.form)
        .then(this.$router.push({ path: "/products" }))
        .catch((error) => console.error(error));
    },
    editProduct: function () {
      axios
        .patch("http://localhost:3000/products/" + this.id, this.form)
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
    },
  },
};
</script>
