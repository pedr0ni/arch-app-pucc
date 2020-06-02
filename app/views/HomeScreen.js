import React from 'react';

import { ProgressChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaConsumer, useSafeArea } from 'react-native-safe-area-context'

import Header from '../components/Header';

import ApiService from '../service/api.service'
import Semanas from '../service/semanas.json'

import { Ionicons } from '@expo/vector-icons';
import { Styles } from '../utils/DefaultStyles';

class HomeScreen extends React.Component {

    state = {
        fakeObjects: [
            {id: 1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}
        ],
        grade: [],
        semanas: Semanas,
        currentSemana: Semanas[0],
        isLoading: false
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._loadData()
    }

    getGradeForSemana = (semanaId) => {
        let gradeList = this.state.grade
        let result = []
        for (let i = 0; i < gradeList.length; i++) {
            if (gradeList[i].semana == semanaId) {
                result.push(gradeList[i])
            }
        }
        return result
    }

    _loadData = async () => {
        this.setState({
            isLoading: true
        })
        // Get grade
        setTimeout(async () => {
            const loggedUser = await ApiService.getLoggedUser()
            ApiService.post('grade/aluno', {userId: loggedUser.userId}).then(response => {
                this.setState({grade: response.data})
            }).catch(error => {
                console.error(error)
            }).then(() => {
                this.setState({
                    isLoading: false
                })
            })
        }, 1500)
    }

    _nextSemana = () => {
        this.setState({
            currentSemana: this.state.currentSemana.id + 1 >= this.state.semanas.length ? this.state.semanas[0] : this.state.semanas[this.state.currentSemana.id + 1]
        })
    }

    _prevSemana = () => {
        this.setState({
            currentSemana: this.state.currentSemana.id - 1 <= -1 ? this.state.semanas[this.state.semanas.length - 1] : this.state.semanas[this.state.currentSemana.id - 1]
        })
    }

    onRefresh = () => {
        this._loadData();
    }

    render() {

        return (
            <View>
                <Header title="Grade desta semana" />
                {
                    this.state.semanas.map(entry => {
                        return (
                            <View key={entry.id}>
                                {
                                    this.state.currentSemana.id == entry.id ? 
                                    <View>
                                        <View style={styles.weekRow}>
                                            <TouchableOpacity onPress={() => this._prevSemana()}>
                                                <Ionicons name={Platform.OS === 'ios' ? "ios-arrow-back" : 'md-arrow-back'} size={32} />
                                            </TouchableOpacity>
                                            <Text style={styles.weekTitle}>{ this.state.currentSemana.name }</Text>
                                            <TouchableOpacity onPress={() => this._nextSemana()}>
                                                <Ionicons name={Platform.OS === 'ios' ? "ios-arrow-forward" : 'md-arrow-forward'} size={32} />
                                            </TouchableOpacity>
                                        </View>
                                        <ScrollView
                                        refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.onRefresh()} />}
                                        style={styles.scrollView}
                                        showsHorizontalScrollIndicator={false} 
                                        showsVerticalScrollIndicator={false}>
                                        {
                                            this.getGradeForSemana(entry.id).map(entry => {
                                                return (
                                                    <View key={entry.gradeId} style={[styles.card, Styles.defaultShadow]}>
                                                        <View style={styles.roundCircleHolder}>
                                                        <Text style={styles.roundCircleHover}>{entry.frequencia}%</Text>
                                                        <ProgressChart
                                                            data={{labels: ['Frequencia'], data: [entry.frequencia / 100]}}
                                                            width={100}
                                                            height={100}
                                                            strokeWidth={16}
                                                            radius={32}
                                                            chartConfig={chartConfig}
                                                            hideLegend={true}
                                                        />
                                                        </View>
                                                        <View style={styles.cardDescription}>
                                                            <Text style={styles.cardDescriptionTitle}>{entry.materia.name}</Text>
                                                            <Text>{entry.horario}</Text>
                                                            <Text>{entry.sala}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }

                                        </ScrollView>
                                    </View>
                                :
                                    <View></View>
                                }
                                
                            </View>
                        )
                    })
                }
            </View>
        );
    }

}

const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(22, 51, 108, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const styles = StyleSheet.create({
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 50
    },
    weekTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    card: {
        height: 120,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cardDescription: {
        display: 'flex',
        justifyContent: 'center'
    },
    cardDescriptionTitle: {
        fontWeight: 'bold'
    },
    roundCircleHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundCircle: {
        
    },
    roundCircleHover: {
        position: 'absolute',
        left: 28
    },
    scrollView: {
        height: '100%'
    }
});

export default HomeScreen;