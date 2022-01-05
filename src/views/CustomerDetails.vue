<template>
  <div v-if="customer">
    <h1>Customer details</h1>
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
        <OrderList :filter="customer._id"/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from "axios";
import OrderList from "@/components/OrderList";
export default {
  data() {
    return {
      id: this.$route.params.id,
      customer: null,
    };
  },
  components: {
    OrderList,
  },
  methods: {
    fetchCustomer() {
      axios
        .get("http://localhost:3000/customers/" + this.id)
        .then((response) => {
          this.customer = response.data;
        });
    },
  },
  created() {
    this.fetchCustomer();
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
