<template>
  <div class="text-start">
    <h1 class="mb-5">Add new attribute</h1>
    <b-button class="mb-4" @click="goBack()"> Go back </b-button>
    <AttributeAddEditForm :attribute="attribute" />
  </div>
</template>
<script>
import AttributeAddEditForm from "@/components/Attribute/AttributeAddEditForm";
export default {
  setup(props, context) {
    const router = context.root.$router;
    const attribute = {
      name: "",
      values: []
    };
    const goBack = () => {
     router.push("/attributes");
    };
    return {
      attribute,
      goBack,
    };
  },
  components: {
    AttributeAddEditForm,
  },
};
</script>
