<template>
<tr class="hover:bg-gray-50 cursor-pointer" @click="$emit('view')">
<td class="p-3">
<img :src="product.thumbnail" class="w-12 h-12 rounded-full object-cover" alt="thumb" />
</td>
<td class="p-3">
<div class="font-semibold text-sm">{{ product.title }}</div>
<div class="text-xs text-gray-500">{{ truncate(product.description, 90) }}</div>
</td>
<td class="p-3">{{ product.category }}</td>
<td class="p-3">${{ product.price }}</td>
<td class="p-3">{{ product.stock }}</td>
</tr>
</template>


<script setup>
import { defineProps } from 'vue'
const props = defineProps({ product: Object })


function truncate(text, n) {
if (!text) return ''
return text.length > n ? text.slice(0, n) + '...' : text
}
</script>