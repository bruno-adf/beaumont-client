import axios from 'axios'
import { store } from 'state/store'
import { set } from 'state/dataSlice'
import { toast } from 'sonner'

const token = () => store.getState().auth.token
const userId = () => store.getState().auth.user._id
const projectId = () => store.getState().data.project._id

export const updateInsumo = async (insumoId, data) => {
    await axios.patch(`${process.env.REACT_APP_API_PREFIX}insumos/update`, {
        id: projectId(),
        insumoId: insumoId,
        data: data,
        userId: userId()
    }, {
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        store.dispatch(set(res.data))
        toast.success('Dados do insumo alterados.')
    }).catch((error) => {
        console.log(error)
    })
}

export const criarInsumo = async (data) => {
    await axios.post(`${process.env.REACT_APP_API_PREFIX}insumos/new`, {
        id: projectId(),
        data: data,
        userId: userId()
    }, {
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        console.log(res.data)
        store.dispatch(set(res.data))
        toast.success('Insumo adicionado.')
    }).catch((error) => {
        console.log(error)
    })
}

export const deletarInsumo = async (insumo) => {
    console.log({
        id: projectId(),
        insumo: {
            nome: insumo.nome,
            id: insumo.id
        },
        userId: userId()
    })
    await axios.delete(`${process.env.REACT_APP_API_PREFIX}insumos/delete`, {
        data: {
            id: projectId(),
            insumo: {
                nome: insumo.nome,
                id: insumo.id
            },
            userId: userId()
        },
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token()}`
        }
    }).then((res) => {
        store.dispatch(set(res.data))
        toast.success('Insumo excluído.')
    }).catch((error) => {
        console.log(error)
        toast.error('Erro do servidor.')
    })
}

export const checkInsumo = async (insumoId, check) => {
    await axios.post(`${process.env.REACT_APP_API_PREFIX}insumos/check`,{
        id: projectId(),
        insumoId: insumoId,
        check: check
    },{
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token()}`
        }
    }).then((res) => {
        store.dispatch(set(res.data))
        toast.success('Salvo.')
    }).catch((error) => {
        toast.error('Erro do servidor.')
    })
}