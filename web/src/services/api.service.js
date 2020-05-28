import axios from 'axios'

const BASE_URL = 'http://localhost:5000/'

const api = {

    get(endpoint, data = null) {
        return axios.get(BASE_URL + endpoint, {data})
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

    setLogged(user) {
        localStorage.setItem('session', JSON.stringify(user))
    },

    getLoggedUser() {
        return JSON.parse(localStorage.getItem('session'))
    },

    isLogged() {
        return this.getLoggedUser() != null
    },

    logout() {
        localStorage.removeItem('session')
    },

}

export default api