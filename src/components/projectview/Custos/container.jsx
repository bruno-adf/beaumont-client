import { useState } from "react"
import { updateCustos } from "services/custos"
import schema from "validation/custos"

export default function Presentation (Component) {

    return function Custos (props) {

        const [edit, setEdit] = useState()
        const [saving, setSaving] = useState()

        const handleEdit = async (values) => {
    
            if (saving) return
            setSaving(true)
    
            await updateCustos(values)
    
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
            setEdit={() => setEdit(!edit)}
            saving={saving}
            schema={schema}
            {...props}
            />
        )
    }
}