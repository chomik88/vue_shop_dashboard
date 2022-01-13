import Vue from "vue";
import VueRouter from "vue-router";
import Attributes from "@/views/Attributes/Attributes.vue";
import AttributeAdd from "@/views/Attributes/AttributeAdd.vue";
import AttributeEdit from "@/views/Attributes/AttributeEdit.vue";
import Categories from "@/views/Categories/Categories.vue";
import CategoryAdd from "@/views/Categories/CategoryAdd.vue";
import CategoryEdit from "@/views/Categories/CategoryEdit.vue";
import CustomerDetails from "@/views/Customers/CustomerDetails.vue";
import Customers from "@/views/Customers/Customers.vue";
import Home from "@/views/Home.vue";
import OrderDetails from "@/views/Orders/OrderDetails.vue";
import Orders from "@/views/Orders/Orders.vue";
import Products from "@/views/Products/Products.vue";
import ProductAdd from "@/views/Products/ProductAdd.vue";
import ProductEdit from "@/views/Products/ProductEdit.vue";
import PageNotFound from "@/views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
  {
    path: "/attributes",
    name: "Attributes",
    component: Attributes,
  },
  {
    path: "/new-attribute",
    name: "AttributeAdd",
    component: AttributeAdd,
  },
  {
    path: "/attribute/:id",
    name: "AttributeEdit",
    component: AttributeEdit,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/category/:id",
    name: "CategoryEdit",
    component: CategoryEdit,
  },
  {
    path: "/new-category",
    name: "CategoryAdd",
    component: CategoryAdd,
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
  },
  {
    path: "/customer/:id",
    name: "CustomerDetails",
    component: CustomerDetails,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/order/:id",
    name: "OrderDetails",
    component: OrderDetails,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product/:id",
    name: "ProductEdit",
    component: ProductEdit,
  },
  {
    path: "/new-product",
    name: "ProductAdd",
    component: ProductAdd,
  },
  { path: "*", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
