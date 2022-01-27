<template>
  <div class="text-start" v-if="attribute">
    <h1 class="mb-5">Edit attribute</h1>
    <b-button class="mb-4" @click="goBack()"> Go back </b-button>
    <AttributeAddEditForm :attribute="attribute" v-if="!isLoading" />
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "@vue/composition-api";
import AttributeAddEditForm from "@/components/Attribute/AttributeAddEditForm";
export default {
  setup(props, context) {
    const router = context.root.$router;
    const route = context.root.$route;
    const id = route.params.id;
    const attribute = ref({
      name: "",
      values: [],
    });
    const isLoading = ref(false);

    const fetchAttribute = () => {
      isLoading.value = true;

      axios
        .get("http://localhost:3000/attributes/" + id)
        .then((response) => {
          attribute.value = {
            name: response.data.name,
            values: response.data.attributeValues,
          };
        })
        .catch((error) => console.error(error))
        .finally(() => {
          isLoading.value = false
        });
    };

    const goBack = () => {
      router.push("/attributes");
    };
    fetchAttribute();

    return {
      id,
      attribute,
      fetchAttribute,
      goBack,
      isLoading,
    };
  },
  components: {
    AttributeAddEditForm,
  },
};
</script>
