import axios from "axios"
import { store } from "state/store.js"
import { set } from "state/dataSlice.js"
import { toast } from "sonner"

const token = () => store.getState().auth.token
const userId = () => store.getState().auth.user._id
const projectId = () => store.getState().data.project._id

export const updateCustos = async (data) => {
    return axios.post(`${process.env.REACT_APP_API_PREFIX}custos/update`, {
        id: projectId(),
        userId: userId(),
        data: data
    },{
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        store.dispatch(set(res.data))
        toast.success('Custos do projeto salvos com sucesso')
    }).catch((error) => {
        console.log(error)
    })
}