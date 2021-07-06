import axios from 'axios'
import { URLSearchParams } from 'url'
import Configs from '../constants/Configs'

const NetUtil = {
    test: (code, type) => {
        return new Promise(async (resolve, reject) => {
            console.log(Configs.API_TEST)
            let params = new URLSearchParams()
            params.append('data', code) 
            params.append('type', type)
            console.log(params)
            axios
                .post(Configs.API_TEST, params)
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(new Error(err))
                })
        })
    },
    login: (email, pw) => {
        return new Promise(async (resolve, reject) => {
            console.log(Configs.API_POST_LOGIN)
            let params = new URLSearchParams()
            params.append('email', email)
            params.append('pwd', pw)
            axios
                .post(Configs.API_POST_LOGIN, params)
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(new Error(err))
                })
        })
    },
    getBoard: id => {
        return new Promise(async (resolve, reject) => {
            console.log(`${Configs.API_GET_BOARD}${id}`)
            axios
                .get(`${Configs.API_GET_BOARD}${id}`)
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(new Error(err))
                })
        })
    },
    getCharacters: () => {
        return new Promise(async (resolve, reject) => {
            console.log(`${Configs.API_GET_CHARLIST}`)
            axios
                .get(`${Configs.API_GET_CHARLIST}`)
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(new Error(err))
                })
        })
    },
}

export default NetUtil
