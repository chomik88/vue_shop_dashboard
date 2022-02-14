<template>
  <div v-if="!isLoading">
    <div v-if="attributes" class="d-flex mt-4 attribute-select-wrapper">
      <b-form-select
        v-model="currentSelectedAttribute"
        @change="selectAttribute($event)"
      >
        <template #first>
          <option disabled :value="null">Choose attribute</option>
        </template>
        <template>
          <option
            v-for="availableOption in availableOptions"
            :value="availableOption._id"
            :key="availableOption._id"
          >
            {{ availableOption.name }}
          </option>
        </template>
      </b-form-select>
      <b-button variant="primary" @click="addAttribute"
        >Add new attribute</b-button
      >
    </div>
    <b-form>
      <b-form-group
        v-for="selectedAttribute in selectedAttributes"
        :key="selectedAttribute._id"
      >
        {{ selectedAttribute }}
        <TagsSelect
          :allAttributes="attributes"
          :attribute="selectedAttribute"
          componentType="select"
          ref="editAttributeValues"
          @removeAttribute="removeAttribute($event)"
        />
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
import axios from "axios";
import { ref, computed } from "@vue/composition-api";
import TagsSelect from "@/components/Shared/TagsSelect";
export default {
  components: {
    TagsSelect,
  },
  props: ["definedAttributes"],
  setup(props) {
    const attributes = ref([]);
    const currentSelectedAttribute = ref(null);
    const selectedAttributes = ref([]);
    const isLoading = ref(false);
    const fetchAttributes = () => {
      isLoading.value = true;
      axios
        .get("http://localhost:3000/attributes")
        .then((response) => {
          return (attributes.value = response.data);
        })
        .catch((error) => console.error(error.message))
        .finally(() => {
          selectedAttributes.value = props.definedAttributes || [];
          isLoading.value = false;
        });
    };
    const selectAttribute = (e) => {
      return (currentSelectedAttribute.value = e);
    };
    const addAttribute = () => {
      selectedAttributes.value.push(
        ...attributes.value.filter((attribute) => {
          return attribute._id === currentSelectedAttribute.value;
        })
      );
      currentSelectedAttribute.value = null;
    };
    const availableOptions = computed(() => {
      if (selectedAttributes.value && selectedAttributes.value.length > 0) {
        const selectedAttributesIds = selectedAttributes.value.map((item) => {
          console.log(item);
          console.log(item._id);
          return item._id;
        });
        const result = attributes.value.filter((attribute) => {
          return selectedAttributesIds.indexOf(attribute._id) === -1;
        });
        return result;
      } else {
        return attributes.value;
      }
    });

    const removeAttribute = (idToRemove) => {
      selectedAttributes.value = selectedAttributes.value.filter(
        (item) => item._id != idToRemove
      );
    };

    fetchAttributes();
    return {
      attributes,
      isLoading,
      selectedAttributes,
      availableOptions,
      currentSelectedAttribute,
      selectAttribute,
      addAttribute,
      removeAttribute,
    };
  },
};
</script>
<style lang="scss">
.attribute-select-wrapper {
  .btn {
    margin-left: 20px;
  }
}
</style>
