import axios from './axios';

const AuthService = {
    login(user) {
        return axios.post('users/login', ${ user})
    },

    getUsers() {
        return axios.get('/user')
    }
}

export default AuthService;