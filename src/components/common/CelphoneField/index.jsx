import React from 'react'
import { PatternFormat } from 'react-number-format'
import { TextField } from '@mui/material'

function CelphoneField({ form, field, ...props }) {

    return (
        <PatternFormat
            format='(##) #####-####'
            customInput={TextField}
            variant='standard'
            small='small'
            {...props}
        />
    )
}

export default CelphoneField