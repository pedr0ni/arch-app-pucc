import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Styles } from '../utils/DefaultStyles';

class Header extends React.Component {

    render() {
        return (
            <SafeAreaView style={[styles.safeView, Styles.defaultShadow]}>
                <Text style={styles.defaultTitle}>{this.props.title}</Text>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    safeView: {
        backgroundColor: Colors.defaultBlue,
        alignItems: 'center',
        paddingBottom: 18
    },
    defaultTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '400'
    }
});

export default Header;