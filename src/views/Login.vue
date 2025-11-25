<template> 
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md bg-white p-6 rounded shadow">
      <h2 class="text-2xl font-bold mb-4 text-primary">Login</h2>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm">Username</label>
          <input v-model="username" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm">Password</label>
          <input v-model="password" type="password" class="w-full border rounded px-3 py-2" required />
        </div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <div class="flex justify-end">
          <button class="px-4 py-2 bg-primary text-white rounded">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('emilys') // DummyJSON valid user
const password = ref('emilyspass')
const error = ref(null)
const router = useRouter()
const auth = useAuthStore()

// Restore session on page load
auth.restoreSession()

async function onSubmit() {
  error.value = null
  try {
    // Use fetch directly for DummyJSON login
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Invalid credentials')

    // Save to Pinia store manually
    auth.token = data.token || data.accessToken
    auth.user = data
    localStorage.setItem('auth', JSON.stringify({ token: auth.token, user: auth.user }))

    router.push('/products')
  } catch (err) {
    console.error('Login failed:', err)
    error.value = 'Login failed. Check username/password.'
  }
}
</script>
