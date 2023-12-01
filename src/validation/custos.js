import * as Yup from 'yup'

const custosSchema = Yup.object().shape({
    projetistas: Yup.string(),
    montador: Yup.string(),
    frete: Yup.string(),
    fabrica: Yup.string(),
    impostos: Yup.string(),
    insumos: Yup.string(),
    total: Yup.string()
})

export default custosSchema