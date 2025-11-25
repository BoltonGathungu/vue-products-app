import { defineStore } from 'pinia'
import { api } from '../utils/api'


export const useProductsStore = defineStore('products', {
state: () => ({
products: [],
isLoading: false,
error: null,
}),
actions: {
async fetchProducts() {
this.isLoading = true
this.error = null
try {
const res = await api.get('/products?limit=100')
this.products = res.data.products
} catch (err) {
this.error = err
} finally {
this.isLoading = false
}
},
async fetchProductById(id) {
try {
const res = await api.get(`/products/${id}`)
return res.data
} catch (err) {
throw err
}
},
async addProduct(payload) {
try {
const res = await api.post('/products/add', payload)
this.products.unshift(res.data)
return res.data
} catch (err) {
throw err
}
},
async deleteProduct(id) {
try {
await api.delete(`/products/${id}`)
this.products = this.products.filter(p => p.id !== parseInt(id))
} catch (err) {
throw err
}
}
}
})