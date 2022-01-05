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
export default {
  data() {
    return {
      orders: [],
      tableFields: ["customerId", "orderDate", "actions"],
    };
  },
  props: ["filter"],
  methods: {
    fetchOrders() {
      const url = this.filter
        ? "http://localhost:3000/orders/c/" + this.filter
        : "http://localhost:3000/orders/";
      axios.get(url).then((response) => {
        this.orders = response.data;
      });
    },
    showOrderDetails(id) {
      this.$router.push({ path: `../order/${id}` });
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>
