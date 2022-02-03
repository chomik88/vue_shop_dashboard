<template>
  <div>
    <b-button
      class="d-flex justify-content-start mb-4"
      variant="primary"
      @click="goToAddProduct"
      >Add product</b-button
    >
    <div v-if="!isLoading">
      <b-table
        striped
        bordered
        borderless
        small
        hover
        :items="products"
        :fields="tableFields"
        v-if="products.length > 0"
      >
        <template #cell(mainImage)="data">
          <b-img :src="data.value" v-if="data.value != 'undefined'"></b-img>
        </template>
        <template #cell(actions)="row">
          <div class="buttons-wrapper">
            <b-button
              variant="primary"
              router-tag="button"
              @click="editProduct(row.item._id)"
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
      <p v-else class="text-start">There are no products to show</p>
    </div>
    <p v-else class="text-start">Loading...</p>

    <Modal
      :item="currentItem"
      :visible="modalVisible"
      @hide="reset"
      @triggerDelete="deleteProduct($event._id)"
    />
  </div>
</template>
<script>
import axios from "axios";
import Modal from "@/components/Modal";
import { ref, onMounted } from "@vue/composition-api";
export default {
  components: {
    Modal,
  },
  setup(props, context) {
    const router = context.root.$router;
    const tableFields = ["name", "mainImage", "actions"];
    const products = ref([]);
    const currentItem = ref(null);
    const modalVisible = ref(false);
    const isLoading = ref(false);

    const fetchProducts = () => {
      isLoading.value = true;
      axios
        .get("http://localhost:3000/products")
        .then((response) => {
          products.value = response.data;
        })
        .catch((error) => console.error(error.message))
        .finally(() => {
          isLoading.value = false;
        });
    };
    const editProduct = (id) => {
      router.push({ path: `product/${id}` });
    };
    const deleteProduct = (id) => {
      axios.delete("http://localhost:3000/products/" + id).then(() => {
        fetchProducts();
      });
    };
    const goToAddProduct = () => {
      router.push({ path: "new-product" });
    };
    const showModal = (item) => {
      currentItem.value = item;
      modalVisible.value = true;
    };
    const reset = () => {
      currentItem.value = null;
      modalVisible.value = false;
    };
    // const populateDb = () => {
    //   const products = [
    //     {
    //       name: "Earphones",
    //       description: "Great product",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Smart watch",
    //       description: "dsa",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Polaroid",
    //       description: "Old school camera",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Sport boots",
    //       description: "dasda",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Sun glasses",
    //       description: "These are great!",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Chair",
    //       description: "dsa",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Pepsi",
    //       description: "Almost like Coca-cola",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Car model",
    //       description: "Model of old and fancy car",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Another smart watch",
    //       description: "dsada",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Bootle",
    //       description: "dsadas",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    //       category: [],
    //     },
    //     {
    //       name: "Nice boots",
    //       description: "dd",
    //       thumbnail:
    //         "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=698&q=80",
    //       category: [],
    //     },
    //   ];

    //   products.forEach((item) => {
    //     axios
    //       .post("http://localhost:3000/products", item)
    //       .then(() => console.log("Products added"))
    //       .catch((error) => console.error(error));
    //   });
    // }
    onMounted(fetchProducts);
    // onMounted(fetchProducts, populateDb)

    return {
      tableFields,
      products,
      isLoading,
      currentItem,
      modalVisible,
      editProduct,
      deleteProduct,
      goToAddProduct,
      showModal,
      reset,
    };
  },
};
</script>
<style lang="scss">
.table {
  img {
    width: 80px;
    height: auto;
  }

  .buttons-wrapper {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  td {
    vertical-align: middle;
  }
}
</style>
