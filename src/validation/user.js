import * as Yup from 'yup'

export const userSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Obrigatório'),
    pswd: Yup.string().required('Obrigatório')
})