import React from 'react';

import { StyleSheet, View, Image, Dimensions, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Colors } from '../utils/DefaultStyles';

class LoginScreen extends React.Component {

    _login() {
        const { navigate } = this.props.navigation;

        navigate('Home');
    }

    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                <KeyboardAvoidingView behavior={
                    Platform.OS == 'android' ? 'padding' : 'position'
                } enabled>
                    <View style={styles.imageContainer}>
                        <Image style={{width: 300, height: 'auto', aspectRatio: 16 / 9, resizeMode: 'contain'}} source={require('../assets/logo-big.png')} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Bem-vindo, aluno</Text>
                        <Text style={styles.subTitle}>APP PUC-Campinass</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput placeholder="RA" keyboardType="number-pad" style={styles.materialInput} />
                        <TextInput placeholder="Senha" secureTextEntry={true} style={styles.materialInput} />
                        <TouchableOpacity style={styles.defaultButton} onPress={() => this._login()}>
                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                
            </SafeAreaView>
        );
    }
}

let maxWidth = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    }, 
    imageContainer: {
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'flex-start',
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28
    },
    subTitle: {
        color: Colors.defaultBlue,
        fontSize: 18
    },
    formContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    materialInput: {
        width: maxWidth,
        height: 40,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10
    },
    defaultButton: {
        marginTop: 10,
        width: maxWidth,
        backgroundColor: Colors.defaultBlue,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10
    }
});

export default LoginScreen;