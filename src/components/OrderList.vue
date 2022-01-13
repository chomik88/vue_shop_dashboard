<template>
  <div>
    <b-table
      striped
      bordered
      borderless
      small
      hover
      :items="orders"
      :fields="tableFields"
      v-if="orders.length > 0"
      class="mt-4"
    >
      <template #cell(fullName)="row">
        {{ row.item.firstName }} {{ row.item.lastName }}
      </template>
      <template #cell(actions)="row">
        <div class="buttons-wrapper">
          <b-button
            variant="primary"
            router-tag="button"
            @click="showOrderDetails(row.item._id)"
            >Show details</b-button
          >
        </div>
      </template>
    </b-table>
    <p v-else class="text-start">There are no orders to show</p>
  </div>
</template>
<script>
import axios from "axios";
import { ref, toRefs } from "@vue/composition-api";
export default {
  props: ["filter"],
  setup(props, context) {
    const router = context.root.$router;
    const orders = ref([]);
    const tableFields = ["customerId", "orderDate", "actions"];
    const { filter } = toRefs(props);

    const fetchOrders = () => {
      const url = filter.value
        ? "http://localhost:3000/orders/c/" + filter.value
        : "http://localhost:3000/orders/";
      axios.get(url).then((response) => {
        orders.value = response.data;
      });
    };
    const showOrderDetails = (id) => {
      router.push({ path: `../order/${id}` });
    };

    fetchOrders();

    return {
      orders,
      tableFields,
      showOrderDetails,
    };
  },
};
</script>
