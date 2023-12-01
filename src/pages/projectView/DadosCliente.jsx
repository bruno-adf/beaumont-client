import React, { useRef, useState } from 'react'
import { Card, Typography, Stack, TextField, Box, Button, IconButton, CircularProgress } from '@mui/material'
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa'
import { Formik, Field, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import CelphoneField from 'components/CelphoneField'
import { set } from 'state/dataSlice'
import dataSchema from 'validation/dadosCliente'
import { toast } from 'sonner'
import { updateDadosCliente } from 'api/dadoscliente'
import { patternFormatter } from 'react-number-format'

function DadosCliente({ data }) {

    const project = useSelector((state) => state.data.project)
    const token = useSelector((state) => state.auth.token)
    const userId = useSelector((state) => state.auth.user._id)
    const [edit, setEdit] = useState()
    const [saving, setSaving] = useState()
    const formRef = useRef()
    const dispatch = useDispatch()

    const handleEdit = async (values, onSubmitProps) => {
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
    <Card
    variant='outlined'
    sx={{
        flexGrow: 1,
        height: '450px',
        p: 3,
        width: '100%'
    }}>
        {edit ? (
            <Stack spacing={'auto'} height={'100%'}>
                <Stack direction='row' spacing={'auto'}>
                    <Typography variant='h6' fontWeight={'Bold'}>Dados do cliente</Typography>
                    <Stack direction='row' spacing={2}>
                        <IconButton color='primary' sx={{width: '40px', height: '40px'}} onClick={handleCancel}><FaTimes/></IconButton>
                        <IconButton color='primary' sx={{width: '40px', height: '40px'}} onClick={() => formRef.current.handleSubmit()}>{saving ? <CircularProgress sx={{ color: 'white' }} size={25} /> : <FaCheck/>}</IconButton>
                    </Stack>
                </Stack>
                <Formik
                innerRef={formRef}
                initialValues={{
                    nome: data.nome ? String(data.nome) : "",
                    celular: data.celular ? String(data.celular) : "",
                    cpf: data.cpf ? String(data.cpf) : "",
                    endereco: data.endereco ? String(data.endereco) : "",
                    email: data.email ? String(data.email) : ""
                }}
                validationSchema={dataSchema}
                onSubmit={handleEdit}
                >
                    {({errors, touched}) => (
                        <Form style={{width:'50%'}}>
                            <Stack spacing={1}>
                                <Field
                                label='Nome'
                                name='nome'
                                as={TextField}
                                error={Boolean(touched.nome) && Boolean(errors.nome)}
                                helperText={touched.nome && errors.nome}
                                size='small'
                                variant='standard'
                                />
                                <Field
                                label='Celular'
                                name='celular'
                                as={CelphoneField}
                                error={Boolean(touched.celular) && Boolean(errors.celular)}
                                helperText={touched.celular && errors.celular}
                                />
                                <Field
                                label='Cpf'
                                name='cpf'
                                as={TextField}
                                error={Boolean(touched.cpf) && Boolean(errors.cpf)}
                                helperText={touched.cpf && errors.cpf}
                                size='small'
                                variant='standard'
                                />
                                <Field
                                label='Endereço'
                                name='endereco'
                                as={TextField}
                                error={Boolean(touched.endereco) && Boolean(errors.endereco)}
                                helperText={touched.endereco && errors.endereco}
                                size='small'
                                variant='standard'
                                />
                                <Field
                                label='Email'
                                name='email'
                                as={TextField}
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                size='small'
                                variant='standard'
                                />
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Stack>
        ) : (
            <Stack spacing={'auto'} height={'100%'}>
                <Stack direction='row' spacing={'auto'}>
                    <Typography variant='h4' fontWeight={'Bold'}>{data.nome}</Typography>
                    <IconButton onClick={() => setEdit(true)} color='primary' sx={{width: '40px', height: '40px'}}><FaEdit/></IconButton>
                </Stack>
                <Stack spacing={'10px'}>
                    <Typography variant='h6' fontWeight={'Bold'}>Dados do cliente</Typography>
                    <Box>
                        <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Celular</Typography>
                        <Typography>{data.celular ? patternFormatter(String(data.celular), { format: '(##) #####-####' }) : '---'}</Typography>
                    </Box>
                    <Box>
                        <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>CPF</Typography>
                        <Typography>{data.cpf ? data.cpf : '---'}</Typography>
                    </Box>
                    <Box>
                        <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>Endereço</Typography>
                        <Typography>{data.endereco ? data.endereco : '---'}</Typography>
                    </Box>
                    <Box>
                        <Typography color={'grey'} sx={{ fontSize: '0.8rem' }}>E-mail</Typography>
                        <Typography>{data.email ? data.email : '---'}</Typography>
                    </Box>
                </Stack>
            </Stack>
        )}
    </Card>
  )
}

export default DadosCliente