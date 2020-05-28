<template>
    <div>

        <md-button class="md-fab md-plain fab-right" @click="openCreating">
            <md-icon>add</md-icon>
        </md-button>

        <md-dialog :md-active.sync="currentEditing.showDialog" v-if="currentEditing.user != null">
            <md-dialog-title>{{ currentEditing.creating ? 'Criar novo aluno' : currentEditing.user.name }}</md-dialog-title>

            <md-dialog-content>
                <div class="md-layout md-gutter md-padding-left">
                    <md-field>
                        <label>Nome</label>
                        <md-input v-model="currentEditing.user.name"></md-input>
                    </md-field>    

                    <md-field>
                        <label>Email</label>
                        <md-input v-model="currentEditing.user.email"></md-input>
                    </md-field>   

                    <md-field>
                        <label>Id do Curso</label>
                        <md-input type="number" v-model="currentEditing.user.courseId"></md-input>
                    </md-field>    

                    <md-field>
                        <label>Senha</label>
                        <md-input v-model="currentEditing.user.password"></md-input>
                    </md-field>
       
                </div>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="currentEditing.showDialog = false">Close</md-button>
                <md-button class="md-primary" @click="saveEditing">Save</md-button>
                <md-button class="md-primary" @click="deleteEditing" v-if="!currentEditing.creating"><md-icon>delete</md-icon></md-button>
            </md-dialog-actions>
        </md-dialog>

        <div>
            <md-table v-model="users" md-card @md-selected="onSelect">
                <md-table-toolbar>
                    <h1 class="md-title">Alunos</h1>
                </md-table-toolbar>

                <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                    <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

                    <div class="md-toolbar-section-end">
                    <md-button @click="deleteSelected" class="md-icon-button">
                        <md-icon>delete</md-icon>
                    </md-button>
                    </div>
                </md-table-toolbar>
                
                <md-table-row slot="md-table-row" slot-scope="{ item }" class="md-primary" md-selectable="single" md-auto-select>
                    <md-table-cell md-label="#ID" md-sort-by="id">{{ item.userId }}</md-table-cell>
                    <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                    <md-table-cell md-label="Curso" md-sort-by="course">{{ item.course.name }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
import api from '../services/api.service'
export default {
    name: "Home",
    data() {
        return {
            users: [],
            loading: false,
            selectedUsers: [],
            dialog: {
                show: false,
                content: ''
            },
            currentEditing: {
                user: null,
                showDialog: false
            }
        }
    },
    methods: {
        loadData() {
            this.loading = true
            api.get('user').then(response => {
                console.log(response.data)
                this.users = response.data
            }).catch(error => {

            }).then(() => {
                this.loading = false
            })
        },
        onSelect(selected) {
            this.currentEditing = {
                user: selected,
                showDialog: true,
                creating: false
            }
            if (selected != null)
                this.currentEditing.user.courseId = selected.course.courseId
        },
        deleteEditing() {
            if (this.users.length - 1 <= 0) {
                this.dialog = {
                    show: true,
                    content: 'You should leave at least one registered user'
                }
                this.currentEditing.showDialog = false;
                return
            }
            api.delete('users', [this.currentEditing.user]).then(response => {
                this.users = this.users.filter(u => this.selectedUsers.indexOf(u) == -1)
            }).catch(error => {
                api.handleError(error, (dialog) => {
                    this.dialog = dialog
                })
            })
        },
        getAlternateLabel (count) {
            let plural = ''
            if (count > 1) 
                plural = 's'
            return `${count} user${plural} selected`
        },
        saveEditing() {
            if (this.currentEditing.creating) {
                
                api.post('user', this.currentEditing.user)
                .then(response => {
                    this.users.push(response.data)
                    this.currentEditing.showDialog = false
                }).catch(error => {
                    console.log(error)
                }).then(() => {

                })

            } else {

            }
        },
        openCreating() {
            this.currentEditing = {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    courseId: 0
                },
                showDialog: true,
                creating: true
            }
        }
    },
    beforeMount() {
        this.loadData()
    }
}
</script>