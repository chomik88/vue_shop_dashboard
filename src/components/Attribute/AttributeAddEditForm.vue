<template>
  <div class="text-start">
  
    <h2>{{ attribute.name }}</h2>
    <b-form @submit.prevent="id ? editAttribute() : addAttribute()">
      <b-form-group label="Attribute name">
        <b-form-input
          id="input-name"
          v-model="attribute.name"
          type="text"
          placeholder="Enter attribute name"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Attribute values (separated by colon)" class="mt-3">
        <b-form-tags v-model="attribute.values">
          <template v-slot="{ tags }">
            <b-input-group> </b-input-group>
            <div>
              <b-form-tag v-for="tag in tags" :key="tag" :title="tag">
                {{ tag }}
              </b-form-tag>
            </div>
          </template>
        </b-form-tags>
      </b-form-group>
      <b-button type="submit" variant="primary" class="mt-4">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
import axios from "axios";
import { reactive } from "@vue/composition-api";
export default {
  props: ["attribute"],
  setup(props, context) {
    const route = context.root.$route;
    const id = route.params.id;
    console.log(props.attribute);
    const form = reactive({
      name: props.attribute.name,
      values: props.attribute.values,
    });

    console.log(form);

    const addAttribute = () => {
      axios
        .post("http://localhost:3000/attributes/", form)
        .then(console.log("dddd"))
        .catch((error) => console.error(error));
    };

    return {
      form,
      id,
      addAttribute,
    };
  },
};
</script>
