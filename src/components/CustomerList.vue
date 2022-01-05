<template>
  <div>
    <b-table
      striped
      bordered
      borderless
      small
      hover
      :items="customers"
      :fields="tableFields"
      v-if="customers.length > 0"
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
            @click="showCustomerDetails(row.item._id)"
            >Show details</b-button
          >
        </div>
      </template>
    </b-table>
    <p v-else class="text-start">There are no customers to show</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableFields: ["fullName", "email", "actions"],
      customers: [],
    };
  },
  methods: {
    fetchCustomers: function () {
      axios.get("http://localhost:3000/customers").then((response) => {
        this.customers = response.data;
      });
    },
    showCustomerDetails(id) {
      this.$router.push({ path: `customer/${id}` });
    },
    populateDb: function () {
      const customers = [
        {
          firstName: "Jan",
          lastName: "Nowak",
          email: "jan@nowak.pl",
          dateOfBirth: "Thu Dec 21 2006 12:07:54 GMT+0000",
          address: {
            street: "Polna 3",
            flatNumber: "12",
            zipCode: "12-222",
            city: "Strzałowo",
            country: "Poland",
          }
        },
        {
          firstName: "Cezary",
          lastName: "Cezary",
          email: "dsada@dsada.pl",
          dateOfBirth: "Thu Dec 21 2006 12:07:54 GMT+0000",
          address: {
            street: "Okopowa 32",
            flatNumber: "1",
            zipCode: "22-203",
            city: "Węgorzewo",
            country: "Poland",
          }
        },
        {
          firstName: "Zbigniew",
          lastName: "Mróz",
          email: "nowymail@mddds.pl",
          dateOfBirth: "Thu Dec 21 2006 12:07:54 GMT+0000",
          address: {
            street: "Lipowa 5",
            flatNumber: "2",
            zipCode: "54-302",
            city: "Warszawa",
            country: "Poland",
          }
        },
        {
          firstName: "Józef",
          lastName: "Podoliński",
          email: "testowy@test.pl",
          dateOfBirth: "Thu Dec 21 2006 12:07:54 GMT+0000",
          address: {
            street: "Długa 7",
            flatNumber: "2",
            zipCode: "56-201",
            city: "Szczecin",
            country: "Poland",
          }
        },
        {
          firstName: "Andrzej",
          lastName: "Kowalski",
          email: "andrzejek@buziaczek.pl",
          dateOfBirth: "Thu Dec 21 2006 12:07:54 GMT+0000",
          address: {
            street: "Miodowa 13",
            flatNumber: "43",
            zipCode: "14-202",
            city: "Józefów",
            country: "Poland",
          }
        },
        {
          firstName: "Stasiek",
          lastName: "Nowak",
          email: "stasiek@wp.pl",
          dateOfBirth: "Thu Dec 21 2006 12:07:54 GMT+0000",
          address: {
            street: "Pokątna 2",
            flatNumber: "",
            zipCode: "90-201",
            city: "Mława",
            country: "Poland",
          }
        },
        {
          firstName: "Grażyna",
          lastName: "Mosiek",
          email: "grazka@o2.pl",
          dateOfBirth: "Thu Dec 21 2006 12:07:54 GMT+0000",
          address: {
            street: "Leśna 5",
            flatNumber: "23",
            zipCode: "32-102",
            city: "Limanowa",
            country: "Poland",
          }
        },
        {
          firstName: "Genowefa",
          lastName: "Mróz",
          email: "mrozna@wp.pl",
          dateOfBirth: "Thu Dec 21 2006 12:07:54 GMT+0000",
          address: {
            street: "Krzywa 34",
            flatNumber: "",
            zipCode: "22-102",
            city: "Lipowa",
            country: "Poland",
          }
        }
      ];

      customers.forEach((item) => {
        axios
          .post("http://localhost:3000/customers", item)
          .then(() => console.log("Customers added"))
          .catch((error) => console.error(error));
      });
    },
  },
  mounted() {
    this.fetchCustomers();
    // this.populateDb();
  },
};
</script>
