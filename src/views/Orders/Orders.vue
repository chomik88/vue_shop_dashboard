<template>
  <div>
    <h1 class="mb-5">List of orders</h1>
    <OrderList />
  </div>
</template>
<script>
import OrderList from "@/components/OrderList";
export default {
  components: {
    OrderList,
  },
};
</script>
