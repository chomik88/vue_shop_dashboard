<template>
  <div class="product-edit" v-if="product">
    <b-container>
      <b-row>
        <b-col md="4" class="text-start">
          <b-img fluid :src="product.thumbnail" alt=""></b-img>
          <b-form>
            <b-form-group label="Thumbnail">
              <b-form-file v-model="form.thumbnail" plain></b-form-file>
            </b-form-group>
          </b-form>
        </b-col>
        <b-col class="text-start">
          <h1>{{ product.name }}</h1>
          <b-form>
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
            >
              <b-form-textarea
                id="textarea-description"
                v-model="form.description"
                placeholder="Enter product description"
              ></b-form-textarea>
            </b-form-group>
          </b-form>
        </b-col>
        <pre>
              {{ form | JSON }}
          </pre
        >
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: null,
      form: {
        name: "",
        description: "",
        thumbnail: "",
      },
    };
  },
  methods: {
    fetchProduct() {
      axios
        .get("http://localhost:3000/products/" + this.id)
        .then((response) => {
          console.log(response);
          this.product = response.data;
          this.form = {
            name: this.product.name,
            description: this.product.description,
            thumbnail: this.product.thumbnail,
          };
        });
    },
    editProduct(row) {
      console.log(row);
    },
  },
  created() {
    this.fetchProduct();
  },
};
</script>
