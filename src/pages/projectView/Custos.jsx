import React, { useRef, useState } from 'react'
import { Card, Typography, Stack, TextField, Box, Button, IconButton, CircularProgress } from '@mui/material'
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa'
import { Formik, Field, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { set } from 'state/dataSlice'
import dataSchema from 'validation/custos'
import { updateCustos } from 'api/custos'

function Custos({ data, projectId, reload }) {

    const [edit, setEdit] = useState()
    const [saving, setSaving] = useState()
    const formRef = useRef()

    const handleEdit = async (values, onSubmitProps) => {

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
        <Card
            variant='outlined'
            sx={{
                flexGrow: 1,
                height: '450px',
                p: 3,
                width: '100%'
            }}
        >
            <Stack spacing={'auto'} height={'100%'}>
                <Stack direction='row' spacing={'auto'}>
                    <Typography variant='h6' fontWeight={'Bold'}>Custos</Typography>
                    {edit ?
                        <Stack direction='row' spacing={2}>
                            <IconButton color='primary' sx={{ width: '40px', height: '40px' }} onClick={handleCancel}><FaTimes /></IconButton>
                            <IconButton color='primary' sx={{ width: '40px', height: '40px' }} onClick={() => formRef.current.handleSubmit()}>{saving ? <CircularProgress sx={{ color: 'white' }} size={25} /> : <FaCheck />}</IconButton>
                        </Stack>
                        :
                        <IconButton onClick={() => setEdit(true)} color='primary' sx={{ width: '40px', height: '40px' }}><FaEdit /></IconButton>
                    }
                </Stack>
                {edit ? (
                    <Formik
                        innerRef={formRef}
                        initialValues={{
                            projetistas: data.projetistas ? String(data.projetistas) : "",
                            montador: data.montador ? String(data.montador) : "",
                            frete: data.frete ? String(data.frete) : "",
                            fabrica: data.fabrica ? String(data.fabrica) : "",
                            impostos: data.impostos ? String(data.impostos) : "",
                            insumos: data.insumos ? String(data.insumos) : "",
                            total: data.total ? String(data.total) : ""
                        }}
                        validationSchema={dataSchema}
                        onSubmit={handleEdit}
                    >
                        {({ errors, touched }) => (
                            <Form style={{ width: '50%' }}>
                                <Stack spacing={1}>
                                    <Field
                                        label='Projetistas'
                                        name='projetistas'
                                        as={TextField}
                                        error={Boolean(touched.projetistas && errors.projetistas)}
                                        helperText={touched.projetistas && errors.projetistas}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        label='Montador'
                                        name='montador'
                                        as={TextField}
                                        error={Boolean(touched.montador && errors.montador)}
                                        helperText={touched.montador && errors.montador}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        label='Frete'
                                        name='frete'
                                        as={TextField}
                                        error={Boolean(touched.frete && errors.frete)}
                                        helperText={touched.frete && errors.frete}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        label='Fábrica'
                                        name='fabrica'
                                        as={TextField}
                                        error={Boolean(touched.fabrica && errors.fabrica)}
                                        helperText={touched.fabrica && errors.fabrica}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        label='Impostos'
                                        name='impostos'
                                        as={TextField}
                                        error={Boolean(touched.impostos && errors.impostos)}
                                        helperText={touched.impostos && errors.impostos}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        label='Insumos'
                                        name='insumos'
                                        as={TextField}
                                        error={Boolean(touched.insumos && errors.insumos)}
                                        helperText={touched.insumos && errors.insumos}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        label='Total'
                                        name='total'
                                        as={TextField}
                                        error={Boolean(touched.total && errors.total)}
                                        helperText={touched.total && errors.total}
                                        size='small'
                                        variant='standard'
                                    />
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <Stack spacing={'10px'}>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Projetistas</Typography>
                            <Typography>{data.projetistas ? data.projetistas : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Montador</Typography>
                            <Typography>{data.montador ? data.montador : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Frete</Typography>
                            <Typography>{data.frete ? data.frete : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Fábrica</Typography>
                            <Typography>{data.fabrica ? data.fabrica : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Impostos</Typography>
                            <Typography>{data.impostos ? data.impostos : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Insumos</Typography>
                            <Typography>{data.insumos ? data.insumos : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Total</Typography>
                            <Typography>{data.total ? data.total : '---'}</Typography>
                        </Box>
                    </Stack>
                )}
            </Stack>
        </Card>
    )
}

export default Custos