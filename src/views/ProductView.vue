<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <input v-model="q" placeholder="Search by title..." class="border rounded px-3 py-2" />
        <button @click="reload" class="px-3 py-2 border rounded">Reload</button>
      </div>
      <router-link to="/products/new" class="px-4 py-2 bg-primary text-white rounded">
        Add New Product
      </router-link>
    </div>

    <div v-if="store.isLoading">Loading...</div>
    <div v-if="store.error" class="text-red-500">Error loading products</div>

    <table class="w-full bg-white rounded shadow overflow-hidden">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="p-3">Thumb</th>
          <th class="p-3">Title</th>
          <th class="p-3">Category</th>
          <th class="p-3">Price</th>
          <th class="p-3">Stock</th>
        </tr>
      </thead>
      <tbody>
        <!-- Fixed v-for with key on the component itself -->
        <ProductRow
          v-for="p in filtered"
          :key="p.id"
          :product="p"
          @view="() => viewProduct(p.id)"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductRow from '../components/ProductRow.vue'
import { useRouter } from 'vue-router'

const q = ref('')
const store = useProductsStore()
const router = useRouter()

onMounted(() => {
  store.fetchProducts()
})

const filtered = computed(() => {
  if (!q.value) return store.products
  return store.products.filter(p =>
    p.title.toLowerCase().includes(q.value.toLowerCase())
  )
})

function viewProduct(id) {
  router.push(`/products/${id}`)
}

function reload() {
  store.fetchProducts()
}
</script>
