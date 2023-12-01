import React from 'react'
import { Card, Typography, Grid, Divider, useMediaQuery, useTheme, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { set, clear } from 'state/dataSlice'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import StatusIndicator from 'components/StatusIndicator'
import { numericFormatter } from 'react-number-format'

function ListItem({ data }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const small = useMediaQuery(theme.breakpoints.down('lg'))

    const handleClick = () => {
        navigate(`/projectview/${data._id}`)
    }

    return (
        <Card
            sx={{
                p: 2,
                my: 1,
                '&:hover': {
                    cursor: 'pointer',
                    bgcolor: 'action.hover'
                }
            }}
            variant='outlined'
            onClick={handleClick}
        >
            {small ? (
            <Grid container>
                <Grid item xs={6}>
                    <Stack direction={'column'} justifyContent={'space-between'} sx={{height: '100%'}}>
                        <Typography fontWeight={'Bold'}>
                            {data.dadosCliente.nome}
                        </Typography>
                        <StatusIndicator index={data.dadosProjeto.status}/>
                    </Stack>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mx: '15px', height: '80px', alignSelf: 'center' }} />
                <Grid item>
                    <Stack>
                        <Typography fontSize={'small'}>Inicio:</Typography>
                        <Typography fontSize={'small'}>{data.dadosProjeto.inicio ? dayjs(data.dadosProjeto.inicio).format('DD/MM/YYYY') : '---'}</Typography>
                    </Stack>
                    <Stack>
                        <Typography fontSize={'small'}>Entrega:</Typography>
                        <Typography fontSize={'small'}>{data.dadosProjeto.entrega ? dayjs(data.dadosProjeto.entrega).format('DD/MM/YYYY') : '---'}</Typography>
                    </Stack>
                </Grid>
            </Grid>
            ) : (
            <Grid container>
                <Grid item xs={3}>
                    <Typography>
                        {data.dadosCliente.nome}
                    </Typography>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px' }} />
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem' sx={{ textAlign: 'center' }}>
                        {data.dadosCliente.ambientes ? data.dadosCliente.ambientes : '---'}
                    </Typography>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px' }} />
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem' sx={{ textAlign: 'center' }}>
                        {data.dadosProjeto.inicio ? dayjs(data.dadosProjeto.inicio).format('DD/MM/YYYY') : '---'}
                    </Typography>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px' }} />
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem' sx={{ textAlign: 'center' }}>
                        {data.dadosProjeto.entrega ? dayjs(data.dadosProjeto.entrega).format('DD/MM/YYYY') : '---'}
                    </Typography>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px' }} />
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem' sx={{ textAlign: 'center' }}>
                        {data.custos.insumos ? data.custos.insumos : '---'}
                    </Typography>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px' }} />
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem' sx={{ textAlign: 'center' }}>
                        {data.dadosProjeto.valor_total ? numericFormatter(String(data.dadosProjeto.valor_total), { prefix: 'R$' }) : '---'}
                    </Typography>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px' }} />
                <Grid item xs={2}>
                    <Typography fontSize='0.8rem' sx={{ textAlign: 'center' }}>
                        {data.dadosCliente.ambientes ? data.dadosCliente.ambientes : '---'}
                    </Typography>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px' }} />
                <Grid
                item
                xs={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <StatusIndicator index={data.dadosProjeto.status}/>
                </Grid>
            </Grid>
            )}
        </Card>
    )
}

export default ListItem