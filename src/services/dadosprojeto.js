import axios from "axios"
import { store } from "state/store"
import { set } from "state/dataSlice"
import { toast } from "sonner"

const token = () => store.getState().auth.token
const userId = () => store.getState().auth.user._id
const projectId = () => store.getState().data.project

export const updateDadosProjeto = async (id, data) => {
    await axios.patch(`${process.env.REACT_APP_API_PREFIX}dadosprojeto/update`, {
        id: id,
        userId: userId(),
        data: data
    },{
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        store.dispatch(set(res.data))
        console.log(store.getState().data.project)
        toast.success('Dados do projeto salvos com sucesso.')
    }).catch((error) => {
        console.log(error)
        toast.error('Ocorreu um erro ao salvar os dados.')
    })
}

export const updateStatus = async (status) => {
    await axios.patch(`${process.env.REACT_APP_API_PREFIX}dadosprojeto/updatestatus`, {
        userId: userId(),
        id: projectId(),
        status: status
    },{
        headers: {
            "Authorization": `Bearer ${token()}`,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        store.dispatch(set(res.data))
        toast.success('Status atualizado.')
    }).catch((error) => {
        console.log(error)
        toast.error('Erro do servidor')
    })
}