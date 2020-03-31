import React from 'react';

import { View } from 'react-native';
import Header from '../components/Header'

class ProfileScreen extends React.Component {

    render() {
        return (
            <View>
                <Header title="Meu perfil" />
            </View>
        );
    }

}

export default ProfileScreen;