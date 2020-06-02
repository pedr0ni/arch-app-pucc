import React from 'react';

import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';

import ApiService from '../service/api.service'

import Header from '../components/Header'

class ProfileScreen extends React.Component {

    state = {
        loggedUser: null
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        this.setState({
            loggedUser: await ApiService.getLoggedUser()
        })
    }

    async _logout() {
        await ApiService.logout()
        const { navigate } = this.props.navigation;
        navigate('Login');
    }

    render() {

        return (
            <View>
                <Header title="Meu perfil" />
                <View>
                    <View style={styles.infoHolder}>
                        <Image style={styles.profileImage} source={require('../assets/user.png')} />
                        {
                            this.state.loggedUser != null ?
                            (
                                <View style={styles.textHolder}>
                                    <Text style={styles.title}>{ this.state.loggedUser.name }</Text>
                                    <Text>{ this.state.loggedUser.email }</Text>
                                    <Text>{ this.state.loggedUser.course.name }</Text>
                                </View>
                            ): <></>
                        }
                    </View>
                    <TouchableOpacity style={styles.defaultButton} onPress={() => this._logout()}>
                        <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const deviceWidth = Dimensions.get('window').width
let maxWidth = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
    infoHolder: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileImage: {
        width: 128,
        height: 128
    },
    textHolder: {
        width: deviceWidth / 2
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    defaultButton: {
        marginTop: 10,
        marginLeft: 10,
        width: maxWidth,
        backgroundColor: '#e74c3c',
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10
    }
})

export default ProfileScreen;