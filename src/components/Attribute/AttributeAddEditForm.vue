<template>
  <div class="text-start">
    <h2>{{ attribute.name }}</h2>
    <b-form @submit.prevent="id ? editAttribute() : addAttribute()">
      <b-form-group label="Attribute name">
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          placeholder="Enter attribute name"
        ></b-form-input>
      </b-form-group>
      <TagsSelect
        :tagValues="form.values"
        @updateTags="updateFormTags"
        componentType="add"
      />
      <b-button type="submit" variant="primary" class="mt-4">Submit</b-button>
    </b-form>
    <pre>
      {{ form }}
    </pre>
  </div>
</template>
<script>
import axios from "axios";
import { reactive, ref } from "@vue/composition-api";
import TagsSelect from "@/components/Shared/TagsSelect";
export default {
  props: ["attribute"],
  components: {
    TagsSelect,
  },
  setup(props, context) {
    const route = context.root.$route;
    const router = context.root.$router;
    const id = route.params.id;
    const newAttributeValues = ref([]);
    const deletedAttributeValues = ref([]);
    const form = reactive({
      name: props.attribute.name,
      values: props.attribute.values,
    });

    const addAttribute = () => {
      axios
        .post("http://localhost:3000/attributes/", {
          name: form.name,
          values: form.values,
        })
        .then((response) => {
         console.log(response)
        })
        .catch((error) => console.error(error));
    };

    const addAttributeValues = (id, values) => {
      values.map((value) => {
        if (deletedAttributeValues.value.indexOf(value) > -1) {
          values.splice(value, 1);
        }
      });
      values.map((value) => {
        axios
          .post("http://localhost:3000/attribute-values/", {
            attributeId: id,
            value: value,
          })
          .catch((error) => console.error(error));
      });
    };

    const editAttribute = () => {
      axios
        .patch("http://localhost:3000/attributes/" + id, form)
        .then((response) => {
          addAttributeValues(response.data._id, newAttributeValues.value);
        })
        .catch((error) => console.error(error))
        .finally(() => router.push({ path: "/attributes" }));
    };

    const updateFormTags = (e) => {
      form.values = e;
    };

    return {
      form,
      id,
      addAttribute,
      editAttribute,
      updateFormTags,
    };
  },
};
</script>
<style lang="scss">
.b-form-tags {
  &.form-control {
    border: unset;
    padding: 0;
  }
  output {
    display: none;
  }

  .tags-wrapper {
    margin-top: 8px;
  }
}
.b-form-tag {
  background: var(--bs-secondary);
  padding: 3px 7px;
  color: #fff;
  button.b-form-tag-remove {
    background: unset;
    border: unset;
  }
}
</style>
