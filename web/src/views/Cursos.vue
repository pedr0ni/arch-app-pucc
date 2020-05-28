<template>
    <div>

        <md-button class="md-fab md-plain fab-right" @click="openCreating">
            <md-icon>add</md-icon>
        </md-button>

        <md-dialog :md-active.sync="currentEditing.showDialog" v-if="currentEditing.course != null">
            <md-dialog-title>{{ currentEditing.creating ? 'Criar novo curso' : currentEditing.course.name }}</md-dialog-title>

            <md-dialog-content>
                <div class="md-layout md-gutter md-padding-left">
                    <md-field>
                        <label>Nome</label>
                        <md-input v-model="currentEditing.course.name"></md-input>
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
            <md-table v-model="cursos" md-card @md-selected="onSelect">
                <md-table-toolbar>
                    <h1 class="md-title">Cursos</h1>
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
                    <md-table-cell md-label="#ID" md-sort-by="id">{{ item.courseId }}</md-table-cell>
                    <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
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
            cursos: [],
            loading: false,
            selectedUsers: [],
            dialog: {
                show: false,
                content: ''
            },
            currentEditing: {
                course: null,
                showDialog: false
            }
        }
    },
    methods: {
        loadData() {
            this.loading = true
            api.get('course').then(response => {
                console.log(response.data)
                this.cursos = response.data
            }).catch(error => {

            }).then(() => {
                this.loading = false
            })
        },
        onSelect(selected) {
            this.currentEditing = {
                course: selected,
                showDialog: true,
                creating: false
            }
        },
        deleteEditing() {
            api.delete('user', {
                curseId: this.currentEditing.course.curseId
            }).then(response => {
                this.cursos = this.cursos.filter(c => c.curseId != this.currentEditing.course.curseId)
                this.currentEditing.showDialog = false
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
                
                api.post('course', {
                    name: this.currentEditing.course.name
                }).then(response => {
                    console.log(response)
                    this.cursos.push(response.data)
                    this.currentEditing.showDialog = false
                }).catch(error => {
                    console.log(error)
                }).then(() => {

                })

            } else {
                api.put('course', {
                    name: this.currentEditing.course.name,
                    courseId: this.currentEditing.course.courseId
                }).then(response => {
                    console.log('ok')
                }).catch(error => {
                    console.log(error)
                }).then(() => {

                })
            }
        },
        openCreating() {
            this.currentEditing = {
                course: {
                    name: ''
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