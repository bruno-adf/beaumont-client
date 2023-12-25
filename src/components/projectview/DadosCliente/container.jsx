import { updateDadosCliente } from "services/dadoscliente"
import schema from 'validation/dadosCliente'
import { useState } from "react"

export default function DadosCliente(Component) {
    return function Container(props) {

        const [edit, setEdit] = useState()
        const [saving, setSaving] = useState()
    
        const handleEdit = async (values) => {
            if (saving) return
            setSaving(true)
    
            const newValues = {
                ...values,
                celular: Number(String(values.celular).replace(/\D/g, ''))
            }
            await updateDadosCliente(newValues)
    
            setEdit(!edit)
            setSaving(false)
        }
        const handleCancel = () => {
            setEdit(!edit)
        }
    
        return (
            <Component
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                edit={edit}
                setEdit={() => setEdit(true)}
                saving={saving}
                schema={schema}
                {...props}
            />
        )
    }
}