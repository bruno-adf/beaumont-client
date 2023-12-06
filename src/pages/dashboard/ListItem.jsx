import React from 'react'
import { Card, Typography, Grid, Divider, useMediaQuery, useTheme, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import StatusIndicator from 'components/StatusIndicator'
import { numericFormatter } from 'react-number-format'

function ListItem({ data }) {

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
                mb: 1,
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
                    <Stack direction={'column'} justifyContent={'space-evenly'} sx={{height: '100%'}}>
                        <Typography fontWeight={'Bold'}>
                            {data.dadosCliente.nome}
                        </Typography>
                        <StatusIndicator index={data.dadosProjeto.status}/>
                    </Stack>
                </Grid>
                <Divider color='white' orientation='vertical' flexItem sx={{ mx: '15px', height: '80px', alignSelf: 'center' }} />
                <Grid item>
                    <Stack>
                        <Typography fontSize={'small'}>{data.dadosProjeto.inicio ? dayjs(data.dadosProjeto.inicio).format('DD/MM/YYYY') : '---'}</Typography>
                        <Typography fontSize={'small'} color={'grey'}>Inicio</Typography>
                    </Stack>
                    <Stack>
                        <Typography fontSize={'small'}>{data.dadosProjeto.entrega ? dayjs(data.dadosProjeto.entrega).format('DD/MM/YYYY') : '---'}</Typography>
                        <Typography fontSize={'small'} color={'grey'}>Entrega</Typography>
                    </Stack>
                </Grid>
            </Grid>
            ) : (
            <Grid container>
                <Grid item xs={3}>
                    <Typography fontWeight={'Bold'}>
                        {data.dadosCliente.nome}
                    </Typography>
                    <Typography color={'grey'} fontSize='0.8rem'>
                        Nome
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem'>
                        {data.dadosCliente.ambientes ? data.dadosCliente.ambientes : '---'}
                    </Typography>
                    <Typography color={'grey'} fontSize='0.8rem'>
                        Ambientes
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem'>
                        {data.dadosProjeto.inicio ? dayjs(data.dadosProjeto.inicio).format('DD/MM/YYYY') : '---'}
                    </Typography>
                    <Typography color={'grey'} fontSize='0.8rem'>
                        Início
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem'>
                        {data.dadosProjeto.entrega ? dayjs(data.dadosProjeto.entrega).format('DD/MM/YYYY') : '---'}
                    </Typography>
                    <Typography color={'grey'} fontSize='0.8rem'>
                        Entrega
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem'>
                        {data.custos.insumos ? numericFormatter(String(data.custos.insumos / 100), { prefix: 'R$', decimalSeparator: ',', thousandSeparator: '.', fixedDecimalScale: true, decimalScale: 2 }) : '---'}
                    </Typography>
                    <Typography color={'grey'} fontSize='0.8rem'>
                        Insumos
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography fontSize='0.8rem'>
                        {data.dadosProjeto.valor_total ? numericFormatter(String(data.dadosProjeto.valor_total / 100), { prefix: 'R$', decimalSeparator: ',', thousandSeparator: '.', fixedDecimalScale: true, decimalScale: 2 }) : '---'}
                    </Typography>
                    <Typography color={'grey'} fontSize='0.8rem'>
                        Total
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography fontSize='0.8rem'>
                        {data.dadosCliente.ambientes ? data.dadosCliente.ambientes : '---'}
                    </Typography>
                    <Typography color={'grey'} fontSize='0.8rem'>
                        Responsáveis
                    </Typography>
                </Grid>
                <Grid
                item
                xs={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
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