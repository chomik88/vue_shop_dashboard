<template>
  <div id="app">
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="/">
        <img
          src="@/assets/logo.png"
          alt="logo"
        />
        <span> Shop dashboard</span>
      </b-navbar-brand>
    </b-navbar>
    <b-container>
      <b-row>
        <b-col md="2">
          <b-nav vertical id="nav" class="text-start">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/products">Products</b-nav-item>
            <b-nav-item to="/categories">Categories</b-nav-item>
            <b-nav-item to="/customers">Customers</b-nav-item>
            <b-nav-item to="/orders">Orders</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-nav>
        </b-col>
        <b-col md="10">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.navbar-light {
  border-bottom: 1px solid #cecece;
  padding: 12px 30px;
  margin-bottom: 24px;
  .navbar-brand {
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    img {
      margin-right: 16px;
      width: 40px;
      height: auto;
    }
  }
}

h1 {
  text-align: left;
}
</style>
