import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import ProductView from '../views/ProductView.vue'
import AddProduct from '../views/AddProduct.vue'
import { useAuthStore } from '../stores/auth'


const routes = [
{ path: '/login', name: 'Login', component: Login },
{ path: '/', redirect: '/products' },
{ path: '/products', name: 'Products', component: Products },
{ path: '/products/new', name: 'AddProduct', component: AddProduct },
{ path: '/products/:id', name: 'ProductView', component: ProductView, props: true },
]


const router = createRouter({
history: createWebHistory(),
routes,
})


router.beforeEach((to, from, next) => {
const auth = useAuthStore()
const publicPages = ['/login']
const authRequired = !publicPages.includes(to.path)


if (authRequired && !auth.isAuthenticated) {
return next('/login')
}
if (to.path === '/login' && auth.isAuthenticated) {
return next('/products')
}
next()
})


export default router