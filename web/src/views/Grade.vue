<template>
    <div>

        <md-button class="md-fab md-plain fab-right" @click="openCreating">
            <md-icon>add</md-icon>
        </md-button>

        <md-dialog :md-active.sync="currentEditing.showDialog" v-if="currentEditing.grade != null">
            <md-dialog-title>{{ currentEditing.creating ? 'Criar nova grade' : currentEditing.grade.gradeId }}</md-dialog-title>

            <md-dialog-content>
                <div class="md-layout md-gutter md-padding-left">
                    <md-field>
                        <label>ID do Aluno</label>
                        <md-input v-model="currentEditing.grade.userId"></md-input>
                    </md-field>

                    <md-field>
                        <label>ID da Disciplina</label>
                        <md-input v-model="currentEditing.grade.materiaId"></md-input>
                    </md-field>

                    <md-field>
                        <label>Horario</label>
                        <md-input v-model="currentEditing.grade.horario"></md-input>
                    </md-field>

                    <md-field>
                        <label>Frequencia</label>
                        <md-input v-model="currentEditing.grade.frequencia"></md-input>
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
            <md-table v-model="grades" md-card @md-selected="onSelect">
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
                    <md-table-cell md-label="#ID" md-sort-by="id">{{ item.gradeId }}</md-table-cell>
                    <md-table-cell md-label="Aluno" md-sort-by="aluno">{{ item.user.name }}</md-table-cell>
                    <md-table-cell md-label="Disciplina" md-sort-by="materia">{{ item.materia.name }}</md-table-cell>
                    <md-table-cell md-label="Horario" md-sort-by="horario">{{ item.horario }}</md-table-cell>
                    <md-table-cell md-label="Frequencia" md-sort-by="frequencia">{{ item.frequencia }}</md-table-cell>
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
            grades: [],
            loading: false,
            selectedUsers: [],
            dialog: {
                show: false,
                content: ''
            },
            currentEditing: {
                grade: null,
                showDialog: false
            }
        }
    },
    methods: {
        loadData() {
            this.loading = true
            api.get('grade').then(response => {
                console.log(response.data)
                this.grades = response.data
            }).catch(error => {

            }).then(() => {
                this.loading = false
            })
        },
        onSelect(selected) {
            this.currentEditing = {
                grade: selected,
                showDialog: true,
                creating: false
            }
            if (selected != null) {
                console.log(selected)
                this.currentEditing.grade.materiaId = selected.materia.materiaId
                this.currentEditing.grade.userId = selected.user.userId
            }
        },
        deleteEditing() {
            
        },
        getAlternateLabel (count) {
            let plural = ''
            if (count > 1) 
                plural = 's'
            return `${count} user${plural} selected`
        },
        saveEditing() {
            if (this.currentEditing.creating) {
               
                api.post('grade', this.currentEditing.grade).then(response => {
                    this.grades.push(response.data)
                    this.currentEditing.showDialog = false
                }).catch(error => {
                    console.log(error)
                }).then(() => {

                })

            } else {
                
                api.put('grade', this.currentEditing.grade).then(response => {
                    this.currentEditing.showDialog = false
                }).catch(error => {
                    console.log(error)
                }).then(() => {

                })

            }
        },
        openCreating() {
            this.currentEditing = {
                grade: {
                    userId: 0,
                    materiaId: 0
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