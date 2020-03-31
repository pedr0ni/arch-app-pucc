import React from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaConsumer, useSafeArea } from 'react-native-safe-area-context'

import Header from '../components/Header';

import { Ionicons } from '@expo/vector-icons';
import { Styles } from '../utils/DefaultStyles';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fakeObjects: [
                {}, {}, {}, {}, {}, {}, {}, {}
            ]
        };
    }

    render() {
        return (
            <View>
                <Header title="Grade desta semana" />
                <View style={styles.weekRow}>
                    <Ionicons name={Platform.OS === 'ios' ? "ios-arrow-back" : 'md-arrow-back'} size={32} />
                    <Text style={styles.weekTitle}>Segunda-feira</Text>
                    <Ionicons name={Platform.OS === 'ios' ? "ios-arrow-forward" : 'md-arrow-forward'} size={32} />
                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false}>
                    {
                        this.state.fakeObjects.map(fakeObject => {
                            return (
                                <View style={[styles.card, Styles.defaultShadow]}>
                                    <View style={styles.roundCircleHolder}>
                                        <View style={styles.roundCircle}></View>
                                        <View style={styles.roundCircleHover}></View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }

}

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
        backgroundColor: '#FFF'
    },
    roundCircleHolder: {
        
    },
    roundCircle: {
        
    },
    roundCircleHover: {

    }
});

export default HomeScreen;