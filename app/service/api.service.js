import axios from 'axios'

import { AsyncStorage } from 'react-native'

const BASE_URL = 'http://localhost:5000/'

const api = {

    get(endpoint, data = null) {
        return axios.get(BASE_URL + endpoint, {
            data
        })
    },

    post(endpoint, data = null) {
        return axios.post(BASE_URL + endpoint, data)
    },

    put(endpoint, data = null) {
         return axios.put(BASE_URL + endpoint, data)
    },

    delete(endpoint, data = null) {
        return axios.delete(BASE_URL + endpoint, {
            data
        })
    },

    async setLogged(user) {
        await AsyncStorage.setItem('@LoggedUser', JSON.stringify(user))
    },

    async getLoggedUser() {
        const user = await AsyncStorage.getItem('@LoggedUser')
        if (user != null)
            return JSON.parse(user)
        return null
    },

    async isLogged() {
        return await this.getLoggedUser() != null
    },

    async logout() {
        await AsyncStorage.removeItem('@LoggedUser')
    },

}

export default api