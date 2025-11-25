<template>
  <div class="add-product">
    <h1>Add Product</h1>
    <form @submit.prevent="submitProduct">
      <div>
        <label for="name">Product Name:</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>

      <div>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="product.price" required />
      </div>

      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      product: {
        name: "",
        price: 0,
      },
    };
  },
  methods: {
    submitProduct() {
      console.log("Product submitted:", this.product);
      // Here you can add API call to save product
      alert(`Product "${this.product.name}" added!`);
      this.product.name = "";
      this.product.price = 0;
    },
  },
};
</script>

<style scoped>
.add-product {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.add-product h1 {
  text-align: center;
  margin-bottom: 20px;
}

.add-product div {
  margin-bottom: 15px;
}

.add-product label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.add-product input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.add-product button {
  width: 100%;
  padding: 10px;
  background-color: #ff7900;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-product button:hover {
  background-color: #e66c00;
}
</style>
