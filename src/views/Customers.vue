<template>
  <div>
    <h1 class="mb-5">List of customers</h1>
    <CustomerList />
  </div>
</template>
<script>
import CustomerList from "@/components/CustomerList";
export default {
  components: {
    CustomerList,
  },
};
</script>
