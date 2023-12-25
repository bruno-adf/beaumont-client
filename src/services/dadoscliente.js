import axios from "axios"
import { store } from "state/store"
import { set } from "state/dataSlice"
import { toast } from "sonner"

const token = () => store.getState().auth.token
const userId = () => store.getState().auth.user._id
const projectId = () => store.getState().data.project._id

export const updateDadosCliente = async (data) => {
    return axios.patch(`${process.env.REACT_APP_API_PREFIX}dadoscliente/update`, {
        id: projectId(),
        userId: userId(),
        data: data
    },{
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        console.log(res.data)
        store.dispatch(set(res.data))
        toast.success('Dados do cliente salvos com sucesso.')
    }).catch((error) => {
        console.log(error)
    })
}