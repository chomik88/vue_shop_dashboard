<template>
  <div v-if="customer">
    <h1 class="mb-5">Customer details</h1>
    <b-tabs class="text-start" content-class="mt-3">
      <b-tab title="Customer details">
        <b-row>
          <b-col md="6">
            <div class="details-group">
              <p class="title">Full name:</p>
              <p>{{ customer.firstName }} {{ customer.lastName }}</p>
              <p class="title">Date of birth:</p>
              <p>{{ customer.dateOfBirth }}</p>
              <p class="title">E-mail:</p>
              <p>{{ customer.email }}</p>
            </div>
          </b-col>
          <b-col md="6">
            <div class="details-group">
              <p class="title">Street:</p>
              <p v-if="customer.address.flatNumber">
                {{ customer.address.street }} /
                {{ customer.address.flatNumber }}
              </p>
              <p v-else>
                {{ customer.address.street }}
              </p>
              <p class="title">City:</p>
              <p>{{ customer.address.zipCode }} {{ customer.address.city }}</p>
              <p class="title">Country:</p>
              <p>{{ customer.address.country }}</p>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Orders">
        <OrderList :filter="customer._id" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from "axios";
import OrderList from "@/components/OrderList";
import { ref } from "@vue/composition-api";
export default {
  components: {
    OrderList,
  },
  setup(props, context) {
    const route = context.root.$route;
    const id = route.params.id;
    const customer = ref(null);
    const fetchCustomer = () => {
      axios.get("http://localhost:3000/customers/" + id).then((response) => {
        customer.value = response.data;
      });
    };
    fetchCustomer();
    return {
      customer,
    };
  },
};
</script>
<style lang="scss">
.details-group {
  .title {
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 14px;
  }
}
</style>
