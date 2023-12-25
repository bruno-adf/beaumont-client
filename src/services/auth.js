import axios from "axios";
import { store } from "state/store";
import { toast } from 'sonner'
import { setLogin } from "state/authSlice";

const token = (state) => {
    return store.getState().auth.token
}

export const login = async (values) => {
    return axios.post(`${process.env.REACT_APP_API_PREFIX}auth/login`, {
        email: values.email,
        pswd: values.pswd
    }, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        console.log(res.data)
        store.dispatch(
            setLogin({
                user: res.data.user,
                token: res.data.token
            })
        )
        return true
    }).catch((error) => {
        console.log(error.response)
        // if(error.response.status === 400)
        // toast.error('Email ou senha inválidos.')
        // else
        // toast.error('Erro do servidor.')
        return false
    })
}