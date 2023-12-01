import axios from "axios"
import { store } from "state/store"
import { load, set, clear } from "state/dataSlice.js"
import { toast } from "sonner"

const token = () => store.getState().auth.token
const userId = () => store.getState().auth.user._id
const projectId = () => store.getState().data.project._id

export const getProjetos = async () => {
    await axios.get(`${process.env.REACT_APP_API_PREFIX}projetos/getprojetos`, {
        headers: {
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        store.dispatch(load(res.data))
    }).catch((err) => {
        console.log(err)
    })
}

export const getProjeto = async (id) => {
    await axios.get(`${process.env.REACT_APP_API_PREFIX}projetos/get/${id}`, {
        headers: {
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        store.dispatch(set(res.data))
    }).catch((err) => {
        console.log(err)
    })
}

export const criarProjeto = async () => {
    await axios.post(`${process.env.REACT_APP_API_PREFIX}projetos/new`,{
        userId: userId()
    },
    {
        headers: {
            'Authorization': `Bearer ${token()}`,
            'Content-type': 'application/json'
        },
    }).then((res) => {
        store.dispatch(set(res.data))
        toast.success('Projeto criado.')
    }).catch((error) => {
        console.log(error)
    })
}

export const deletarProjeto = async () => {
    await axios.post(`${process.env.REACT_APP_API_PREFIX}projetos/delete`,{
        projectId: projectId()
    },{
        headers: {
            'Authorization': `Bearer ${token()}`,
            'Content-type': 'application/json'
        }
    }).then((res) => {
        store.dispatch(clear())
        toast.success('Projeto deletado.')
    }).catch((error) => {
        console.log(error.message)
        toast.error('Erro ao excluir projeto.')
    })
}