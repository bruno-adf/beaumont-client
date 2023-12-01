import React, { useState } from 'react'
import { Stack, Button, IconButton, Grid, Typography, Card, useMediaQuery, useTheme, Checkbox, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { numericFormatter } from 'react-number-format'
import { FaEdit, FaInfo, FaTrash } from 'react-icons/fa'
import { toast } from 'sonner'
import { deletarInsumo } from 'api/insumos'

function InsumoItem({ data, clickEdit }) {

    const theme = useTheme()
    const [info, setInfo] = useState(false)
    const small = useMediaQuery(theme.breakpoints.down('lg'))

    const handleDelete = async () => {
        await deletarInsumo({ id: data._id, nome: data.nome })
    }

    const handleInfo = () => {
        setInfo(!info)
    }

    return (
        <Card
            variant='outlined'
            sx={{
                p: 2
            }}
        >
            {small ? (
                <Stack spacing={1}>
                    <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Checkbox sx={{ p: 0 }} size={'small'} />
                            <Typography>{data.nome} {data.quantidade}</Typography>
                        </Stack>
                        <Typography>{data.valor}</Typography>
                    </Stack>
                    <Grid container>
                        <Grid xs={4} item>
                            <Stack>
                                <Typography>{data.fornecedor ? data.fornecedor : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Fornecedor</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={4} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Stack>
                                <Typography>{data.tamanho ? data.tamanho : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Tamanho</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={4} item sx={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                            <Stack>
                                <Typography>{data.cor ? data.cor : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Cor</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ width: '100%' }}>
                        <Grid item xs={4} sx={{ pr: '8px' }}>
                            <Button onClick={clickEdit} sx={{ width: '100%' }} variant='contained'><FaEdit /></Button>
                        </Grid>
                        <Grid item xs={4} sx={{ pr: '8px' }}>
                            <Button
                                sx={{ width: '100%' }}
                                variant='contained'
                            ><FaInfo onClick={() => setInfo(true)}/></Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button sx={{ width: '100%' }} variant='contained'><FaTrash /></Button>
                        </Grid>
                    </Grid>
                </Stack>
            ) : (
                <Stack direction={'row'} alignItems={'center'}>
                    <Checkbox />
                    <Grid container>
                        <Grid xs={2} item>
                            <Stack>
                                <Typography>{data.nome ? data.nome : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Nome</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={2} item>
                            <Stack>
                                <Typography>{data.fornecedor ? data.fornecedor : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Fornecedor</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={2} item>
                            <Stack>
                                <Typography>{data.quantidade ? data.quantidade : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Quantidade</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={2} item>
                            <Stack>
                                <Typography>{data.tamanho ? data.tamanho : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Tamanho</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={2} item>
                            <Stack>
                                <Typography>{data.valor ? numericFormatter(String(data.valor / 100), { prefix: 'R$', decimalSeparator: ',', thousandSeparator: '.', fixedDecimalScale: true, decimalScale: 2 }) : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Valor</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={2} item>
                            <Stack>
                                <Typography>{data.cor ? data.cor : '---'}</Typography>
                                <Typography color={'grey'} fontSize={'0.8rem'}>Cor</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Stack direction={'row'} spacing={1}>
                        <IconButton onClick={() => setInfo(true)}><FaInfo/></IconButton>
                        <IconButton onClick={clickEdit} size='small' color='primary'><FaEdit /></IconButton>
                        <IconButton onClick={handleDelete} size='small' color='primary'><FaTrash /></IconButton>
                    </Stack>
                </Stack>
            )}
            <Dialog>
                <DialogTitle fontWeight={'Bold'}>
                    Informações adicionais
                </DialogTitle>
                <DialogContent>
                    {data.info}
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default InsumoItem