<template>
    <div>

        <md-button class="md-fab md-plain fab-right" @click="openCreating">
            <md-icon>add</md-icon>
        </md-button>

        <md-dialog :md-active.sync="currentEditing.showDialog" v-if="currentEditing.materia != null">
            <md-dialog-title>{{ currentEditing.creating ? 'Criar nova disciplina' : currentEditing.materia.name }}</md-dialog-title>

            <md-dialog-content>
                <div class="md-layout md-gutter md-padding-left">
                    <md-field>
                        <label>Nome</label>
                        <md-input v-model="currentEditing.materia.name"></md-input>
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
            <md-table v-model="materias" md-card @md-selected="onSelect">
                <md-table-toolbar>
                    <h1 class="md-title">Materias</h1>
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
                    <md-table-cell md-label="#ID" md-sort-by="id">{{ item.materiaId }}</md-table-cell>
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
            materias: [],
            loading: false,
            selectedUsers: [],
            dialog: {
                show: false,
                content: ''
            },
            currentEditing: {
                materia: null,
                showDialog: false
            }
        }
    },
    methods: {
        loadData() {
            this.loading = true
            api.get('materia').then(response => {
                console.log(response.data)
                this.materias = response.data
            }).catch(error => {

            }).then(() => {
                this.loading = false
            })
        },
        onSelect(selected) {
            this.currentEditing = {
                materia: selected,
                showDialog: true,
                creating: false
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
                
                api.post('materia', this.currentEditing.materia).then(response => {
                    this.materias.push(response.data)
                    this.currentEditing.showDialog = false
                }).catch(error => {
                    console.log(error)
                }).then(() => {

                })

            } else {
                
                api.put('materia', this.currentEditing.materia).then(response => {
                    this.currentEditing.showDialog = false
                }).catch(error => {
                    console.log(error)
                }).then(() => {
                    
                })

            }
        },
        openCreating() {
            this.currentEditing = {
                materia: {
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