<template>
  <div>
    <b-row>
      <b-col md="12" class="text-start mb-4">
        <b-button @click="goBack()">Go back</b-button>
      </b-col>
    </b-row>
    <div v-if="product">
      <h1 class="mb-5">Edit product</h1>
      <b-form v-if="!isLoading" class="text-start">
        <b-button @click="editProduct()">Submit</b-button>
        <b-tabs>
          <b-tab title="Product main features">
            <ProductAddEditForm
              :product="product"
              @refreshView="fetchProduct"
              class="mt-4"
              ref="editForm"
            />
          </b-tab>
          <b-tab title="Product attributes">
            <ProductAttributesEditForm
              ref="editAttributes"
              :definedAttributes="product.attributes"
            />
          </b-tab>
        </b-tabs>
      </b-form>
      <p v-else>Loading...</p>
    </div>
    <div v-else>
      <h1>Product doesn't exist</h1>
    </div>
  </div>
</template>
<script>
import ProductAddEditForm from "@/components/Product/ProductAddEditForm";
import ProductAttributesEditForm from "../../components/Product/ProductAttributesEditForm.vue";
import axios from "axios";
import { ref } from "@vue/composition-api";
export default {
  components: {
    ProductAddEditForm,
    ProductAttributesEditForm,
  },

  setup(props, context) {
    const router = context.root.$router;
    const route = context.root.$route;
    const id = route.params.id;
    const product = ref(null);
    const isLoading = ref(false);
    const editForm = ref(null);
    const editAttributes = ref(null);
    const updatedProduct = ref(null);

    const fetchProduct = () => {
      isLoading.value = true;
      axios
        .get("http://localhost:3000/products/" + id)
        .then((response) => {
          product.value = response.data;
        })
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    const goBack = () => {
      router.push("/products");
    };

    const editProduct = () => {
      const editAttributesComponents =
        editAttributes.value.$refs.editAttributeValues;
      const updatedAttributes = [];
      editAttributesComponents.map((item) => {
        if (!item.selectTagState.id) {
          return;
        }
        return updatedAttributes.push({
          _id: item.selectTagState.id,
          attributeValues: item.selectTagState.usedValues,
        });
      });
      updatedProduct.value = {
        ...product.value,
        ...editForm.value.form,
        attributes: updatedAttributes,
      };

      axios
        .patch("http://localhost:3000/products/" + id, updatedProduct.value)
        .then(() => {
          console.log("Update request");
        })
        .catch((error) => console.error(error));
    };

    fetchProduct();
    return {
      product,
      isLoading,
      fetchProduct,
      goBack,
      editForm,
      editAttributes,
      editProduct,
    };
  },
};
</script>
