import * as Yup from 'yup'

const dataSchema = Yup.object().shape({
        inicio: Yup.string().required(),
        entrega: Yup.string().required(),
        ambientes: Yup.string().required(),
        lote: Yup.string().required(),
        projetistas: Yup.string().required(),
        valor_total: Yup.string().required()
})

export default dataSchema