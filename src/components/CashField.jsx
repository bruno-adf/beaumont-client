import React from 'react'
import { NumericFormat } from 'react-number-format'
import { TextField } from '@mui/material'

function CashField({ form, field, ...props }) {

    return (
        <NumericFormat
            prefix='R$'
            decimalSeparator=','
            thousandSeparator='.'
            fixedDecimalScale
            decimalScale={2}
            customInput={TextField}
            variant='standard'
            small='small'
            {...props}
        />
    )
}

export default CashField