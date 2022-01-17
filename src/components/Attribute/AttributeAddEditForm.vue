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
      <b-form-group label="Attribute values" class="mt-3">
        <b-form-tags v-model="form.values" no-outer-focus>
          <template
            v-slot="{
              tags,
              inputAttrs,
              inputHandlers,
              addTag,
              removeTag,
              tagVariant,
            }"
          >
            <b-input-group>
              <b-form-input
                v-bind="inputAttrs"
                v-on="inputHandlers"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" @click="addTag">Add</b-button>
              </b-input-group-append>
            </b-input-group>
            <div class="tags-wrapper">
              <b-form-tag
                v-for="tag in tags"
                :key="tag"
                :title="tag"
                @remove="removeTag(tag)"
                :variant="tagVariant"
              >
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
import { reactive, watch, ref } from "@vue/composition-api";
export default {
  props: ["attribute"],
  setup(props, context) {
    const route = context.root.$route;
    const router = context.root.$router;
    const id = route.params.id;
    const attributeValues = props.attribute.values;
    const newAttributeValues = ref([]);
    const deletedAttributeValues = ref([]);
    const form = reactive({
      name: props.attribute.name,
      values: [],
    });

    const addAttribute = () => {
      axios
        .post("http://localhost:3000/attributes/", {
          name: form.name,
        })
        .then((response) => {
          addAttributeValues(response.data._id, form.values);
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
        .then(() => removeAttributeValues())
        .catch((error) => console.error(error))
        .finally(() => router.push({ path: "/attributes" }));
    };

    const setTagsValues = () => {
      attributeValues.map((item) => form.values.push(item.value));
    };

    const removeAttributeValues = () => {
      const valuesToRemove = attributeValues.filter((item) => {
        if (deletedAttributeValues.value.indexOf(item.value) > -1) {
          return item;
        }
      });
      valuesToRemove.map((value) => {
        axios
          .delete("http://localhost:3000/attribute-values/" + value.id)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      });
    };

    setTagsValues();

    watch(
      () => [...form.values],
      (newValue, oldValue) => {
        const newAttributeValue = newValue.filter((item) => {
          if (oldValue.indexOf(item) === -1) {
            return item;
          }
        });
        const deletedValues = oldValue.filter((item) => {
          if (newValue.indexOf(item) === -1) {
            return item;
          }
        });
        newAttributeValues.value.push(...newAttributeValue);
        deletedAttributeValues.value.push(...deletedValues);
      }
    );

    return {
      form,
      id,
      addAttribute,
      editAttribute,
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
