import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard.vue'

import Home from '../views/Home.vue'
import Alunos from '../views/Alunos.vue'
import Cursos from '../views/Cursos.vue'
import Grade from '../views/Grade.vue'
import Materias from '../views/Materias.vue'

import Login from '../views/Login.vue'

import api from '../services/api.service'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/dashboard',
		component: Dashboard,
		meta: {
			requiresAuth: true
		},
		children: [
			{
				path: 'home',
				name: 'Home',
				component: Home,
				meta: {
					requiresAuth: true
				}
			},
			{
				path: 'alunos',
				name: 'Alunos',
				component: Alunos,
				meta: {
					requiresAuth: true
				}
			},
			{
				path: 'cursos',
				name: 'Cursos',
				component: Cursos,
				meta: {
					requiresAuth: true
				}
			},
			{
				path: 'materias',
				name: 'Materias',
				component: Materias,
				meta: {
					requiresAuth: true
				}
			},
			{
				path: 'grade',
				name: 'Grade',
				component: Grade,
				meta: {
					requiresAuth: true
				}
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from ,next) => {
	console.log('router', to.meta)
	if (to.meta.requiresAuth && !api.isLogged()) {
		next({ name: 'Login' })
		return
	}
	if (to.name == 'Login' && api.isLogged()) {
		next({ name: 'Home' })
		return
	}
	next()
})


export default router
