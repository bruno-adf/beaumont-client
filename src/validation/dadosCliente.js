import * as Yup from 'yup'

const dadosClienteSchema = Yup.object().shape({
    nome: Yup.string(),
    celular: Yup.string(),
    cpf: Yup.string(),
    endereco: Yup.string(),
    email: Yup.string()
})

export default dadosClienteSchema