import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import EditProduct from "@/views/EditProduct.vue";
import AddProduct from "@/views/AddProduct.vue";
import Categories from "@/views/Categories.vue";
import AddCategory from "@/views/AddCategory.vue";
import EditCategory from "@/views/EditCategory.vue";
import Customers from "@/views/Customers.vue";
import CustomerDetails from "@/views/CustomerDetails.vue";
import Orders from "@/views/Orders.vue";
import OrderDetails from "@/views/OrderDetails.vue";
import PageNotFound from "@/views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/category/:id",
    name: "EditCategory",
    component: EditCategory,
  },
  {
    path: "/new-category",
    name: "AddCategory",
    component: AddCategory,
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
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product/:id",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/new-product",
    name: "AddProduct",
    component: AddProduct,
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
  { path: "*", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
