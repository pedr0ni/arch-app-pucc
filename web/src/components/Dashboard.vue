<template>
	<div class="page-container">
		<md-app md-mode="reveal">
			<md-app-toolbar class="md-primary">
			<md-button class="md-icon-button" @click="menuVisible = !menuVisible">
				<md-icon>menu</md-icon>
			</md-button>
			<span class="md-title">PUC-Campinas / APP Aluno - {{ $route.name }}</span>

			<div class="md-toolbar-section-end">
				<md-menu md-size="medium" md-align-trigger>
					<md-button md-menu-trigger class="md-icon-button">
						<md-icon>more_vert</md-icon>
					</md-button>

					<md-menu-content>
						<md-list-item>
							<md-avatar>
								<img src="https://placeimg.com/40/40/people/1" alt="People">
							</md-avatar>

							<div class="md-list-item-text">
								<span>{{ loggedUser.name }}</span>
							</div>
						</md-list-item>
						<md-list-item>
							<md-icon>settings_brightness</md-icon>
							<span class="md-list-item-text">Dark Mode</span>
							<md-switch />
						</md-list-item>
						<md-menu-item @click="1">
							<md-icon>account_circle</md-icon>
							<span>My Account</span>
						</md-menu-item>
						<md-menu-item @click="logout">
							<md-icon>close</md-icon>
							<span>Logout</span>
						</md-menu-item>
					</md-menu-content>
				</md-menu>
			</div>
			</md-app-toolbar>

			<md-app-drawer :md-active.sync="menuVisible">
				<md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>

				<md-list>
					<md-list-item to="/dashboard/home" exact>
						<md-icon>home</md-icon>
						<span class="md-list-item-text">Dashboard</span>
					</md-list-item>

					<md-list-item to="/dashboard/alunos">
						<md-icon>group</md-icon>
						<span class="md-list-item-text">Alunos</span>
					</md-list-item>

                    <md-list-item to="/dashboard/cursos">
						<md-icon>group</md-icon>
						<span class="md-list-item-text">Cursos</span>
					</md-list-item>

					<md-list-item to="/dashboard/materias">
						<md-icon>book</md-icon>
						<span class="md-list-item-text">Disciplinas</span>
					</md-list-item>

					<md-list-item to="/dashboard/grade">
						<md-icon>schedule</md-icon>
						<span class="md-list-item-text">Grade Horária</span>
					</md-list-item>
				</md-list>
			</md-app-drawer>

			<md-app-content>
			<router-view />
			</md-app-content>
		</md-app>
	</div>
</template>

<style scoped>
.md-app {
	min-height: 100vh;
}
</style>

<script>
import api from '../services/api.service'
export default {
    name: 'Reveal',
    data: () => ({
        menuVisible: false,
        loggedUser: api.getLoggedUser()
    }),
    methods: {
        logout() {
            api.logout()
            this.$router.push({ name: 'Login' })
        }
	}
}
</script>