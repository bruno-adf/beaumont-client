import React, { useState } from 'react'
import { Card, Typography, Stack, IconButton } from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import InsumoDialog from '../InsumoDialog'
import InsumoItem from '../InsumoItem'

function Insumos({ data }) {

    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState()
    const handleClose = () => {
        setOpen(false)
        setEdit(undefined)
    }

  return (
    <Card
    variant='outlined'
    sx={{
        width: '100%',
        p: 3
    }}
    >
        <Stack spacing={'10px'}>
            <Stack direction='row' spacing={'auto'}>
                <Typography variant='h6' fontWeight={'Bold'}>Insumos</Typography>
                <IconButton sx={{width: '40px', height: '40px'}} color='primary' onClick={() => setOpen(true)}><FaPlus/></IconButton>
            </Stack>
            <Stack spacing={1}>
                {data.map((insumo, index) => (
                    <InsumoItem clickEdit={() => {setEdit(index)}} data={insumo} key={index}/>
                ))}
            </Stack>
            <InsumoDialog open={open} edit={edit} handleClose={handleClose}/>
        </Stack>
    </Card>
  )
}

export default Insumos