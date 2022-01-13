<template>
  <b-modal @hidden="hide" :visible="visible" v-if="item">
    <template #modal-header>
      <h3>Delete product</h3>
    </template>
    <p>
      Are you sure to delete product: <strong>{{ item.name }}</strong
      >?
    </p>
    <template #modal-footer>
      <b-button @click="hide()">Cancel</b-button>
      <b-button variant="danger" @click="triggerDelete(item)">Remove</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: ["item", "visible"],
  setup(props, context) {
    const hide = () => {
      context.emit("hide");
    };
    const triggerDelete = (item) => {
      context.emit("triggerDelete", item);
      hide();
    };

    return {
      triggerDelete,
      hide
    };
  },
};
</script>
