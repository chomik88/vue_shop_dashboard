<template>
  <div>
    <b-button
      class="d-flex justify-content-start mb-4"
      variant="primary"
      @click="goToAddCategory"
      >Add category</b-button
    >
    <b-table
      striped
      bordered
      borderless
      small
      hover
      :items="categories"
      :fields="tableFields"
      v-if="categories.length > 0"
    >
      <template #cell(actions)="row">
        <div class="buttons-wrapper">
          <b-button
            variant="primary"
            router-tag="button"
            @click="editCategory(row.item._id)"
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
    <p v-else class="text-start">There are no categories to show</p>
    <Modal
      :item="currentItem"
      :visible="modalVisible"
      @hide="reset"
      @triggerDelete="deleteCategory($event._id)"
    />
  </div>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "@vue/composition-api";
import Modal from "@/components/Modal.vue";
export default {
  setup(props, context) {
    const router = context.root.$router;
    const tableFields = ["name", "actions"];
    const categories = ref([]);
    const currentItem = ref(null);
    const modalVisible = ref(false);
    const fetchCategories = () => {
      axios.get("http://localhost:3000/categories").then((response) => {
        categories.value = response.data;
      });
    };
    const editCategory = (id) => {
      router.push({ path: `category/${id}` });
    };
    const deleteCategory = (id) => {
      axios.delete("http://localhost:3000/categories/" + id).then(() => {
        fetchCategories();
      });
    };
    const goToAddCategory = () => {
      router.push({ path: "new-category" });
    };
    const reset = () => {
      currentItem.value = null;
      modalVisible.value = false;
    };
    const showModal = (item) => {
      currentItem.value = item;
      modalVisible.value = true;
    };
    onMounted(fetchCategories);
    return {
      tableFields,
      categories,
      currentItem,
      modalVisible,
      editCategory,
      deleteCategory,
      goToAddCategory,
      reset,
      showModal,
    };
  },
  components: { Modal },
};
</script>
