<template>
  <div v-if="order" class="text-start">
    <h1>Order details</h1>
    <div class="details-group">
      <p class="title">Customer id:</p>
      <p>{{ order.customerId }}</p>
      <p class="title">Customer full name:</p>
      <p>{{ customer }}</p>
      <p class="title">Order date:</p>
      <p>{{ order.orderDate }}</p>
    </div>
    <h2>Ordered products:</h2>
    <pre>
      {{ order.orderItems }}
      {{ orderItems }}
    </pre>
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
import { ref } from "@vue/composition-api";
export default {
  setup(props, context) {
    const router = context.root.$router;
    const route = context.root.$route;
    const id = route.params.id;
    const order = ref(null);
    const customer = ref(null);
    const orderItems = ref([]);
    const tableFields = [
      "productId",
      "productName",
      "quantity",
      "value",
      "actions",
    ];

    const fetchOrder = () => {
      axios
        .get("http://localhost:3000/orders/" + id)
        .then((response) => {
          order.value = response.data;
        })
        // .then(() => fetchProduct())
        .then(() => fetchCustomer());
    };
    const showProduct = (id) => {
      router.push({ path: `../product/${id}` });
    };

    // const fetchProduct = () => {
    //   console.log(order);
    //   order.value.orderItems.forEach((item) => {
    //     console.log(item);
    //     axios
    //       .get("http://localhost:3000/products/" + item.productId)
    //       .then((response) => {
    //         const productName = response.data.name;
    //         item.productName = productName;
    //         console.log(item);
    //         orderItems.value = [...item];
    //       })
    //       .catch((error) => {
    //         console.error(error.message)
    //         orderItems.value = [...item];
    //       });
    //   });
    //   console.log(orderItems);
    //   console.log(order.value.orderItems);
    // };

    const fetchCustomer = () => {
      axios
        .get("http://localhost:3000/customers/" + order.value.customerId)
        .then((response) => {
          customer.value = `${response.data.firstName} ${response.data.lastName}`;
        })
        .catch((error) => console.error(error.message));
    };

    fetchOrder();

    return {
      order,
      customer,
      tableFields,
      showProduct,
      // fetchProduct,
      orderItems,
    };
  },
};
</script>
