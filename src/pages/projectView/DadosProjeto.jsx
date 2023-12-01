import React, { useRef, useState } from 'react'
import { Card, Typography, Box, TextField, InputAdornment, IconButton, Stack, CircularProgress } from '@mui/material'
import { NumericFormat } from 'react-number-format'
import { useSelector, useDispatch } from 'react-redux'
import { numericFormatter } from 'react-number-format'
import StatusIndicator from 'components/StatusIndicator'
import { Formik, Form, Field } from 'formik'
import dataSchema from 'validation/dadosProjetoSchema'
import dayjs from 'dayjs'
import { FaEdit, FaTimes, FaCheck } from 'react-icons/fa'
import { updateDadosProjeto } from 'api/dadosprojeto'
import CashField from 'components/CashField'

function DadosProjeto({ data }) {

    const project = useSelector((state) => state.data.project)
    const token = useSelector((state) => state.auth.token)
    const userId = useSelector((state) => state.auth.user._id)
    const [edit, setEdit] = useState(false)
    const [saving, setSaving] = useState(false)
    const formRef = useRef()
    const dispatch = useDispatch()

    const handleEdit = async (values) => {
        if (saving) return

        setSaving(true)

        const newValues = {
            ...values,
            valor_total: Number(String(values.valor_total).replace(/\D/g, ''))
        }

        await updateDadosProjeto(project._id, newValues)

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
                boxSizing: 'border-box',
                flexGrow: 1,
                height: '450px',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
            <Stack direction='row' spacing='auto'>
                <Box>
                    <Typography variant='h6' fontWeight={'Bold'}>Dados do projeto</Typography>
                    <StatusIndicator unlocked index={data.status}/>
                </Box>
                {edit ? (
                    <Stack direction='row' spacing={2}>
                        <IconButton color='primary' sx={{width: '40px', height: '40px'}} onClick={handleCancel}><FaTimes/></IconButton>
                        <IconButton color='primary' sx={{width: '40px', height: '40px'}} onClick={() => formRef.current.handleSubmit()}>{saving ? <CircularProgress sx={{ color: 'white' }} size={25} /> : <FaCheck/>}</IconButton>
                    </Stack>
                ) : <IconButton onClick={() => setEdit(!edit)} color='primary' sx={{width: '40px', height: '40px'}}><FaEdit/></IconButton>}
            </Stack>
            <Box>
                {edit ? (
                    <Formik
                        innerRef={formRef}
                        initialValues={{
                            inicio: data.inicio ? dayjs(data.inicio).format('YYYY-MM-DD') : dayjs(Date.now()).format('YYYY-MM-DD'),
                            entrega: data.entrega ? dayjs(data.entrega).format('YYYY-MM-DD') : dayjs(Date.now()).format('YYYY-MM-DD'),
                            ambientes: data.ambientes ? String(data.ambientes) : "",
                            lote: data.lote ? data.lote : "",
                            projetistas: data.projetistas ? String(data.projetistas) : "",
                            valor_total: data.valor_total ? (data.valor_total / 100) : 0
                        }}
                        validationSchema={dataSchema}
                        onSubmit={handleEdit}
                    >
                        {({ errors, touched }) => (
                            <Form style={{ width: 300 }}>
                                <Stack spacing={1}>
                                    <Field
                                        label='Início'
                                        name="inicio"
                                        as={TextField}
                                        error={Boolean(touched.inicio) && Boolean(errors.inicio)}
                                        helperText={touched.inicio && errors.inicio}
                                        variant='standard'
                                        size='small'
                                        type='date'
                                    />
                                    <Field
                                        label='Entrega'
                                        name="entrega"
                                        as={TextField}
                                        error={Boolean(touched.entrega) && Boolean(errors.entrega)}
                                        helperText={touched.entrega && errors.entrega}
                                        variant='standard'
                                        size='small'
                                        type='date'
                                    />
                                    <Field
                                        label='Ambientes'
                                        name="ambientes"
                                        as={TextField}
                                        error={Boolean(touched.ambientes) && Boolean(errors.ambientes)}
                                        helperText={touched.ambientes && errors.ambientes}
                                        variant='standard'
                                        size='small'
                                    />
                                    <Field
                                        label='Lote'
                                        name="lote"
                                        as={TextField}
                                        error={Boolean(touched.lote) && Boolean(errors.lote)}
                                        helperText={touched.lote && errors.lote}
                                        variant='standard'
                                        size='small'
                                    />
                                    <Field
                                        label='Projetistas'
                                        name="projetistas"
                                        as={TextField}
                                        error={Boolean(touched.projetistas) && Boolean(errors.projetistas)}
                                        helperText={touched.projetistas && errors.projetistas}
                                        variant='standard'
                                        size='small'
                                    />
                                    {/* <Field
                                        label='Valor total'
                                        name="valor_total"
                                        as={TextField}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                        }}
                                        error={Boolean(touched.valor_total) && Boolean(errors.valor_total)}
                                        helperText={touched.valor_total && errors.valor_total}
                                        variant='standard'
                                        size='small'
                                    /> */}
                                    <Field
                                        label='Valor total'
                                        name="valor_total"
                                        as={CashField}
                                        error={Boolean(touched.valor_total) && Boolean(errors.valor_total)}
                                        helperText={touched.valor_total && errors.valor_total}
                                    />
                                    {/* <Field
                                        label='Valor total'
                                        name="valor_total"
                                        as={TextField}
                                        error={Boolean(touched.valor_total) && Boolean(errors.valor_total)}
                                        helperText={touched.valor_total && errors.valor_total}
                                        variant='standard'
                                        size='small'
                                    /> */}
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <Stack direction='column' spacing={'10px'}>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Início</Typography>
                            <Typography>{data.inicio ? dayjs(data.inicio).format('DD/MM/YYYY') : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Entrega</Typography>
                            <Typography>{data.entrega ? dayjs(data.entrega).format('DD/MM/YYYY') : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Ambientes</Typography>
                            <Typography>{data.ambientes.length !== 0 ? data.ambientes : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Lote</Typography>
                            <Typography>{data.lote ? data.lote : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Projetistas</Typography>
                            <Typography>{data.projetistas.length !== 0 ? data.projetistas : '---'}</Typography>
                        </Box>
                        <Box>
                            <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Valor total</Typography>
                            <Typography>{data.valor_total ? numericFormatter(String(data.valor_total / 100), { prefix: 'R$', decimalSeparator: ',', thousandSeparator: '.', fixedDecimalScale: true, decimalScale: 2 }) : '---'}</Typography>
                        </Box>
                    </Stack>
                )}
            </Box>
        </Card>
    )
}

export default DadosProjeto