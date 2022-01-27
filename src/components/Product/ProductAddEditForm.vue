<template>
  <b-row>
    <b-col md="4" class="text-start">
      <b-img
        fluid
        :src="product.thumbnail"
        alt=""
        v-if="product.thumbnail"
      ></b-img>
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
      <h2>{{ product.name }}</h2>
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
        <b-form-group label="Product categories">
          <b-form-checkbox-group v-model="form.category">
            <b-form-checkbox
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
              >{{ category.name }}</b-form-checkbox
            >
          </b-form-checkbox-group>
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
import { ref, reactive, onMounted } from "@vue/composition-api";
export default {
  props: ["product"],
  setup(props, context) {
    const router = context.root.$router;
    const route = context.root.$route;
    const id = route.params.id;
    const categories = ref([]);
    const form = reactive({
      name: props.product.name,
      description: props.product.description,
      thumbnail: props.product.thumbnail,
      category: props.product.category,
    });
    const addProduct = () => {
      axios
        .post("http://localhost:3000/products", form)
        .then(router.push({ path: "/products" }))
        .catch((error) => console.error(error));
    };
    const editProduct = () => {
      axios
        .patch("http://localhost:3000/products/" + id, form)
        .then(() => {
          refreshView();
        })
        .catch((error) => console.error(error));
    };
    const fetchCategories = () => {
      axios.get("http://localhost:3000/categories").then((response) => {
        categories.value = response.data;
      });
    };
    const refreshView = () => {
      context.emit("refreshView");
    };

    const validateForm = (id) => {
      context.root.$validator.validateAll().then((result) => {
        if (result) {
          console.log(result);
          alert("Form Submitted!");
          return;
        } else {
          id ? editProduct() : addProduct();
        }

        alert("Correct them errors!");
      });
    };

    // const  validateState = (ref) => {
    //   console.log(context)
    //   if (
    //     context.veeFields[ref] &&
    //     (context.veeFields[ref].dirty || context.veeFields[ref].validated)
    //   ) {
    //     return !context.veeErrors.has(ref);
    //   }
    //   return null;
    // }

    onMounted(fetchCategories);

    return {
      form,
      categories,
      id,
      addProduct,
      editProduct,
      refreshView,
      validateForm,
    };
  },
};
</script>
<style lang="scss">
.custom-checkbox {
  input {
    margin-right: 8px;
  }
}
</style>
