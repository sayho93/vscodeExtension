import axios from 'axios'
import { URLSearchParams } from 'url'
import Configs from '../constants/Configs'

const NetUtil = {
    compile: (code, type, input) => {
        return new Promise((resolve, reject) => {
            console.log(Configs.API_COMPILE)
            let params = new URLSearchParams()
            params.append('data', code) 
            params.append('type', type)
            params.append('input', input)
            console.log(params)
            axios
                .post(Configs.API_COMPILE, params)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    },
    getCategory: () => {
        return new Promise((resolve, reject) => {
            console.log(`${Configs.API_GET_CATEGORYLIST}`)
            axios
                .get(Configs.API_GET_CATEGORYLIST)
                .then(res => {
                    console.log(res)
                    if(res.data.returnCode !== 1) reject(res.returnMessage)
                    else resolve(res.data)
                })
                .catch(err => reject(err))
        })
    },
    getProblem: id => {
        return new Promise((resolve, reject) => {
            console.log(`${Configs.API_GET_PROBLEMLIST}/${id}`)
            axios
                .get(`${Configs.API_GET_PROBLEMLIST}/${id}`)
                .then(res => {
                    if(res.data.returnCode !== 1) reject(res.returnMessage)
                    else resolve(res.data)
                })
                .catch(err => reject(err))
        })
    },
    login: (email, pw) => {
        return new Promise((resolve, reject) => {
            console.log(Configs.API_POST_LOGIN)
            let params = new URLSearchParams()
            params.append('email', email)
            params.append('pwd', pw)
            axios
                .post(Configs.API_POST_LOGIN, params)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    },
}

export default NetUtil
