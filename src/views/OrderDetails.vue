<template>
  <div v-if="order" class="text-start">
    <h1>Order details</h1>
    <div class="details-group">
      <p class="title">Customer id:</p>
      <p>{{ order.customerId }}</p>
      <p class="title">Order date:</p>
      <p>{{ order.orderDate }}</p>
    </div>
     <h2>Ordered products:</h2>
    <b-table
      striped
      bordered
      borderless
      small
      hover
      :items="order.orderItems"
      :fields="tableFields"
      v-if="order.orderItems.length > 0"
      class="mt-4"
    >
      <template #cell(value)="row">
        {{ row.item.price * row.item.quantity }}
      </template>
      <template #cell(actions)="row">
        <div class="buttons-wrapper">
          <b-button
            variant="primary"
            router-tag="button"
            @click="showProduct(row.item.productId)"
            >Product details</b-button
          >
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      order: null,
      tableFields: ["productId", "quantity", "value", "actions"],
    };
  },
  methods: {
    fetchOrder: function () {
      axios.get("http://localhost:3000/orders/" + this.id).then((response) => {
        this.order = response.data;
      });
    },
    showProduct(id) {
      this.$router.push({ path: `../product/${id}` });
    },
  },
  created() {
    this.fetchOrder();
  },
};
</script>
