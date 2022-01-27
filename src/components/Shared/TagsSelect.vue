<template>
  <div>
    <b-form-group
      label="Attribute values"
      class="mt-3"
      v-if="componentType === 'add'"
    >
      <b-form-tags v-model="value" no-outer-focus>
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
    <b-form-group label="Attribute values" class="mt-3" v-else>
      {{ tagValues }}
      <b-form-tags v-model="usedValues" no-outer-focus>
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
          <div class="d-flex mt-4 attribute-select-wrapper">
            <b-form-select
              v-bind="inputAttrs"
              v-on="inputHandlers"
              :disabled="availableOptions.length === 0"
              :options="availableOptions"
            >
              <template #first>
                <option disabled value="">Choose a tag...</option>
              </template>
            </b-form-select>
            <b-button variant="primary" @click="addTag">Add</b-button>
          </div>
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
    {{ value }}
  </div>
</template>
<script>
import { ref, computed, watch } from "@vue/composition-api";
export default {
  props: ["tagValues", "componentType"],
  setup(props, context) {
    const value = ref([]);
    const usedValues = ref([]);
    props.tagValues ? (value.value = props.tagValues) : (value.value = []);
    const availableOptions = computed(() => {
      const result = props.tagValues.filter((tagValue) => {
        return usedValues.value.indexOf(tagValue) === -1;
      });
      return result;
    });

    watch(value, (tags) => {
      context.emit("updateTags", tags);
    });

    return {
      value,
      usedValues,
      availableOptions,
    };
  },
};
</script>
