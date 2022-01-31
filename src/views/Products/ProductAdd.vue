<template>
  <div>
    <h1 class="mb-5">Add new product</h1>
    <b-row>
      <b-col md="12" class="text-start mb-4">
        <b-button @click="goBack()">Go back</b-button>
      </b-col>
    </b-row>
    <b-button @click="addProduct()">Submit</b-button>
    <b-tabs class="text-start">
      <b-tab title="Product main features">
        <ProductAddEditForm :product="product" class="mt-4" ref="editForm" />
      </b-tab>
      <b-tab title="Product attributes">
        <ProductAttributesEditForm ref="editAttributes" />
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import axios from "axios";
import ProductAddEditForm from "@/components/Product/ProductAddEditForm";
import ProductAttributesEditForm from "../../components/Product/ProductAttributesEditForm.vue";
import { ref } from "@vue/composition-api";
export default {
  components: {
    ProductAddEditForm,
    ProductAttributesEditForm,
  },
  setup(props, context) {
    const router = context.root.$router;
    const product = ref({
      name: "",
      description: "",
      thumbnail: "",
    });
    const editForm = ref(null);
    const editAttributes = ref(null);

    const goBack = () => {
      router.push("/products");
    };

    const addProduct = () => {
      const editAttributesComponents =
        editAttributes.value.$refs.editAttributeValues;
      const updatedAttributes = [];
      editAttributesComponents.map((item) => {
        if (!item.selectTagState.id) {
          return;
        }
        return updatedAttributes.push({
          attributeId: item.selectTagState.id,
          attributeValues: item.selectTagState.usedValues,
        });
      });
      product.value = {
        ...product.value,
        ...editForm.value.form,
        attributes: updatedAttributes,
      };

      axios
        .post("http://localhost:3000/products", product.value)
        .then(() => router.push({ path: "/products" }))
        .catch((error) => console.error(error));
    };
    return {
      product,
      editForm,
      editAttributes,
      goBack,
      addProduct,
    };
  },
};
</script>
