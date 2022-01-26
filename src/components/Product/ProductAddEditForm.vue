<template>
  <b-row>
    <b-col md="12" class="text-start mb-4">
      <b-button @click="goBack()">Go back</b-button>
    </b-col>
    <b-col md="4" class="text-start">
      <b-img fluid :src="mainImage" alt="" v-if="mainImage"></b-img>
      <b-form>
        <b-form-group label="Add product images">
          <b-form-file id="images" @change="onImagesSelect" multiple>
          </b-form-file>
        </b-form-group>
      </b-form>
    </b-col>
    <b-col class="text-start" md="8">
      <h2>{{ product.name }}</h2>
      <!-- <b-form @submit.prevent="validateForm(id)"> -->
      <b-form @submit.prevent="id ? editProduct() : addProduct()">
        <b-form-group label="Product name" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="form.name"
            type="text"
            placeholder="Enter product name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Product description"
          label-for="textarea-description"
          class="mt-3"
        >
          <b-form-textarea
            id="textarea-description"
            v-model="form.description"
            placeholder="Enter product description"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Product categories">
          <b-form-checkbox-group v-model="form.category">
            <b-form-checkbox
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
              >{{ category.name }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mt-4">Submit</b-button>
      </b-form>
    </b-col>
    <b-col>
      <b-row v-if="productImageThumbnails.length > 0">
        <b-col
          md="4"
          v-for="thumbnail in productImageThumbnails"
          :key="thumbnail.name"
        >
          <div class="img-item rounded">
            <b-img
              rounded
              alt="Rounded image"
              fluid
              :src="thumbnail.src"
            ></b-img>
            <div class="img-overlay rounded">
              <b-icon-trash-fill
                variant="warning"
                font-scale="2"
                @click="removeImage(thumbnail)"
              ></b-icon-trash-fill>
              <b-form-checkbox
                :id="thumbnail.name"
                v-model="mainImage"
                name="main-image"
                :value="thumbnail.src"
                class="main-image-checkbox"
              >
                Main image?
              </b-form-checkbox>
            </div>
          </div>
        </b-col>
      </b-row>
      <p v-else>There are no images</p>
    </b-col>
    <pre>
              {{ form }}
          </pre
    >
  </b-row>
</template>
<script>
import axios from "axios";
import { ref, reactive, onMounted } from "@vue/composition-api";
export default {
  props: ["product"],
  setup(props, context) {
    const router = context.root.$router;
    const route = context.root.$route;
    const id = route.params.id;
    const categories = ref([]);
    const form = reactive({
      name: props.product.name,
      description: props.product.description,
      mainImage: props.product.mainImage,
      category: props.product.category,
    });
    const mainImage = ref(null);
    const formData = new FormData();
    const imagesToUpload = ref([]);
    const imagesToDelete = ref([]);
    const productImageThumbnails = ref([]);
    const addProduct = () => {
      defineFormData();
      axios
        .post("http://localhost:3000/products", formData)
        .then(() => router.push({ path: "/products" }))
        .catch((error) => console.error(error));
    };
    const editProduct = () => {
      defineFormData();
      axios
        .patch("http://localhost:3000/products/" + id, formData)
        .then(() => {
          refreshView();
        })
        .catch((error) => console.error(error));
    };
    const fetchCategories = () => {
      axios.get("http://localhost:3000/categories").then((response) => {
        console.log(response.data);
        categories.value = response.data;
      });
    };
    const refreshView = () => {
      context.emit("refreshView");
    };
    const goBack = () => {
      router.push("/products");
    };

    const defineFormData = () => {
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("mainImage", mainImage.value);
      formData.append("imagesToDelete", imagesToDelete.value);
      for (let i = 0; i < imagesToUpload.value.length; i++) {
        console.log(imagesToUpload.value[i]);
        formData.append(
          "images",
          imagesToUpload.value[i],
          imagesToUpload.value[i].name
        );
      }
    };

    const onImagesSelect = (event) => {
      imagesToUpload.value = Array.from(event.target.files);
      imagesToUpload.value.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", function (e) {
          productImageThumbnails.value.push({
            name: file.name,
            src: e.target.result,
          });
        });

        fileReader.readAsDataURL(file);
      });
    };

    // const validateForm = (id) => {
    //   context.root.$validator.validateAll().then((result) => {
    //     if (result) {
    //       console.log(result);
    //       // alert("Form Submitted!");
    //       return;
    //     } else {
    //       id ? editProduct() : addProduct();
    //     }

    //     alert("Correct them errors!");
    //   });
    // };

    // const  validateState = (ref) => {
    //   console.log(context)
    //   if (
    //     context.veeFields[ref] &&
    //     (context.veeFields[ref].dirty || context.veeFields[ref].validated)
    //   ) {
    //     return !context.veeErrors.has(ref);
    //   }
    //   return null;
    // }

    const setProductImages = () => {
      const images = props.product.images;
      images.forEach((image) => {
        productImageThumbnails.value.push({
          name: image.fileName,
          src: `http://localhost:3000/${image.path}`,
        });
      });
    };

    const removeImage = (image) => {
      if (isBase64(image)) {
        imagesToUpload.value = imagesToUpload.value.filter((file) => {
          return file.name != image.name;
        });
        productImageThumbnails.value = productImageThumbnails.value.filter(
          (file) => {
            return file.name != image.name;
          }
        );
      } else {
        productImageThumbnails.value = productImageThumbnails.value.filter(
          (file) => {
            return file.name != image.name;
          }
        );
        imagesToDelete.value.push(image.name);
      }
    };

    const isBase64 = (image) => {
      return image.src.indexOf("base64") > -1;
    };

    onMounted(() => {
      fetchCategories();
      setProductImages();
    });

    return {
      form,
      categories,
      productImageThumbnails,
      id,
      mainImage,
      addProduct,
      editProduct,
      refreshView,
      goBack,
      removeImage,
      // validateForm,
      onImagesSelect,
    };
  },
};
</script>
<style lang="scss">
.custom-checkbox {
  input {
    margin-right: 8px;
  }
}

.img-item {
  position: relative;
  margin-bottom: 12px;
  .img-overlay {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0000003b;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      &:hover {
        cursor: pointer;
      }
    }

    .main-image-checkbox {
      position: absolute;
      bottom: 4px;
      left: 4px;
      color: #fff;
    }
  }

  img {
    aspect-ratio: 243/170;
    object-fit: cover;
  }

  &:hover {
    .img-overlay {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }
}
</style>
