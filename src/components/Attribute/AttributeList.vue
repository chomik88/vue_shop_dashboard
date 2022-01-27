<template>
  <div>
    <b-button
      class="d-flex justify-content-start mb-4"
      variant="primary"
      @click="goToAddAttribute"
      >Add attribute</b-button
    >
    <div v-if="!isLoading">
      <b-table
        striped
        bordered
        borderless
        small
        hover
        :items="attributes"
        :fields="tableFields"
        v-if="attributes.length > 0"
      >
        <template #cell(attributeValues)="row">
          <template v-for="(value, index) in row.item.attributeValues">
            {{ value
            }}<span v-if="index + 1 < row.item.attributeValues.length" :key="value"
              >,</span
            >
          </template>
        </template>
        <template #cell(actions)="row">
          <div class="buttons-wrapper">
            <b-button
              variant="primary"
              router-tag="button"
              @click="editAttribute(row.item._id)"
              >Edit</b-button
            >
            <b-button
              variant="danger"
              router-tag="button"
              @click="showModal(row.item)"
              >Remove</b-button
            >
          </div>
        </template>
      </b-table>
      <p v-else class="text-start">There are no attributes to show</p>
    </div>
    <p v-else class="text-start">Loading...</p>
    <Modal
      :item="currentItem"
      :visible="modalVisible"
      @hide="reset"
      @triggerDelete="deleteAttribute($event._id)"
    />
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "@vue/composition-api";
import Modal from "@/components/Modal.vue";
export default {
  setup(props, context) {
    const router = context.root.$router;
    const attributes = ref([]);
    const tableFields = ["name", "attributeValues", "actions"];
    const currentItem = ref(null);
    const modalVisible = ref(false);
    const isLoading = ref(false);
    const fetchAttributes = () => {
      isLoading.value = true;
      axios
        .get("http://localhost:3000/attributes")
        .then((response) => {
          console.log(response.data)
          return attributes.value = response.data;
        })
        .catch((error) => console.error(error.message))
        .finally(() => (isLoading.value = false));
    };
    const goToAddAttribute = () => {
      router.push({ path: "new-attribute" });
    };
    const editAttribute = (id) => {
      router.push({ path: "/attribute/" + id });
    };
    const deleteAttribute = (id) => {
      axios
        .delete("http://localhost:3000/attributes/" + id)
        .then(() => fetchAttributes());
    };
    const reset = () => {
      currentItem.value = null;
      modalVisible.value = false;
    };
    const showModal = (item) => {
      currentItem.value = item;
      modalVisible.value = true;
    };
    fetchAttributes();
    return {
      attributes,
      tableFields,
      currentItem,
      modalVisible,
      isLoading,
      goToAddAttribute,
      editAttribute,
      deleteAttribute,
      reset,
      showModal,
    };
  },
  components: { Modal },
};
</script>
