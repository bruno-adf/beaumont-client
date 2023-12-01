import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Stack } from '@mui/material'
import { criarInsumo, updateInsumo } from 'api/insumos'
import { Formik, Form, Field } from 'formik'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import CashField from 'components/CashField'
import { numericFormatter } from 'react-number-format'

function InsumoDialog({ open, edit, handleClose }) {
    
    const project = useSelector((state) => state.data.project)
    const formRef = useRef()

    const handleSubmit = async (values) => {
        const newValues = {
            ...values,
            valor: Number(String(values.valor).replace(/\D/g, ''))
        }
        if (edit !== undefined) {
            await updateInsumo(project.insumos[edit]._id, newValues)
        } else {
            await criarInsumo(newValues)
        }
        handleClose()
    }

    return (
        <Dialog open={open || edit !== undefined} handleClose={handleClose}>
            <DialogTitle fontWeight={'Bold'}>
                {edit !== undefined ? 'Editar insumo' : 'Adicionar insumo'}
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        edit !== undefined ? {
                            nome: project.insumos[edit].nome,
                            fornecedor: project.insumos[edit].fornecedor,
                            quantidade: project.insumos[edit].quantidade,
                            tamanho: project.insumos[edit].tamanho,
                            valor: project.insumos[edit].valor / 100,
                            cor: project.insumos[edit].cor,
                            info: project.insumos[edit].info
                        } : {
                            nome: "",
                            fornecedor: "",
                            quantidade: "",
                            tamanho: "",
                            valor: "",
                            cor: "",
                            info: ""
                        }
                    }
                    validate={() => { }}
                    onSubmit={handleSubmit}
                    innerRef={formRef}
                >
                    {({ touched, errors }) => (
                        <Form>
                            <Stack direction={'row'} spacing={3}>
                                <Stack>
                                    <Field
                                        as={TextField}
                                        name='nome'
                                        label='Nome'
                                        error={Boolean(touched.nome) && Boolean(errors.nome)}
                                        helperText={touched.nome && errors.nome}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        as={TextField}
                                        name='fornecedor'
                                        label='Fornecedor'
                                        error={Boolean(touched.fornecedor) && Boolean(errors.fornecedor)}
                                        helperText={touched.fornecedor && errors.fornecedor}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        as={TextField}
                                        name='quantidade'
                                        label='Quantidade'
                                        error={Boolean(touched.quantidade) && Boolean(errors.quantidade)}
                                        helperText={touched.quantidade && errors.quantidade}
                                        size='small'
                                        variant='standard'
                                    />
                                </Stack>
                                <Stack>
                                    <Field
                                        as={TextField}
                                        name='tamanho'
                                        label='Tamanho'
                                        error={Boolean(touched.tamanho) && Boolean(errors.tamanho)}
                                        helperText={touched.tamanho && errors.tamanho}
                                        size='small'
                                        variant='standard'
                                    />
                                    <Field
                                        label='Valor'
                                        name="valor"
                                        as={CashField}
                                    />
                                    <Field
                                        as={TextField}
                                        name='cor'
                                        label='Cor'
                                        error={Boolean(touched.cor) && Boolean(errors.cor)}
                                        helperText={touched.cor && errors.cor}
                                        size='small'
                                        variant='standard'
                                    />
                                </Stack>
                            </Stack>
                            <Field
                                as={TextField}
                                name='info'
                                label='Informações adicionais'
                                error={Boolean(touched.info) && Boolean(errors.info)}
                                helperText={touched.info && errors.info}
                                size='small'
                                variant='standard'
                                sx={{
                                    width: '100%'
                                }}
                            />
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={() => formRef.current.handleSubmit()}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InsumoDialog