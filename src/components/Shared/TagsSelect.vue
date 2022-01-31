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
      <b-form-tags v-model="selectTagState.usedValues" no-outer-focus>
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
          <div
            class="d-flex mt-4 attribute-select-wrapper justify-content-between"
          >
            <div class="left-col">
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
            <b-button
              variant="danger"
              @click="onRemoveAttribute(selectTagState.id)"
              >Remove</b-button
            >
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
    {{ selectTagState }}
  </div>
</template>
<script>
import { ref, computed, watch, reactive } from "@vue/composition-api";
export default {
  props: ["attribute", "componentType", "allAttributes"],
  setup(props, context) {
    const value = ref([]);
    const selectTagState = reactive({
      id: props.attribute._id || props.attribute.attributeId,
      name: props.attribute.name,
      usedValues: props.attribute.attributeValues,
    });
    props.attribute
      ? (value.value = props.attribute.attributeValues)
      : (value.value = []);
    const availableOptions = computed(() => {
      const filteredAttribute = props.allAttributes.filter((item) => {
        return item._id === selectTagState.id;
      });
      if (filteredAttribute.length > 0) {
        return filteredAttribute[0].attributeValues.filter((tagValue) => {
          return selectTagState.usedValues.indexOf(tagValue) === -1;
        });
      } else {
        return (selectTagState.usedValues = []);
      }
    });

    const onRemoveAttribute = (id) => {
      context.emit("removeAttribute", id);
    };

    watch(value, (tags) => {
      context.emit("updateTags", tags);
    });

    return {
      value,
      selectTagState,
      availableOptions,
      onRemoveAttribute,
    };
  },
};
</script>
