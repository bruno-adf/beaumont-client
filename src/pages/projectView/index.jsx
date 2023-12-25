import React, { useEffect } from 'react'
import { Container, Stack, useMediaQuery, useTheme, Skeleton } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getProjeto } from 'services/projetos'
import { useParams } from 'react-router-dom'

import DadosClientePresentation from '../../components/projectview/DadosCliente'
import DadosClienteContainer from '../../components/projectview/DadosCliente/container.jsx'

import DadosProjetoPresentation from '../../components/projectview/DadosProjeto'
import DadosProjetoContainer from '../../components/projectview/DadosProjeto/container.jsx'

import CustosPresentation from '../../components/projectview/Custos'
import CustosContainer from '../../components/projectview/Custos/container.jsx'

import TimelinePresentation from '../../components/projectview/Timeline'
import TimelineContainer from '../../components/projectview/Timeline/container.jsx'

import InsumosPresentation from '../../components/projectview/Insumos'
import InsumosContainer from '../../components/projectview/Insumos/container.jsx'

import NavBarPresentation from 'components/common/Navbar'
import NavBarContainer from 'components/common/Navbar/container.jsx'

function Index() {

    const DadosCliente = DadosClienteContainer(DadosClientePresentation)
    const DadosProjeto = DadosProjetoContainer(DadosProjetoPresentation)
    const Custos = CustosContainer(CustosPresentation)
    const Timeline = TimelineContainer(TimelinePresentation)
    const Insumos = InsumosContainer(InsumosPresentation)
    const NavBar = NavBarContainer(NavBarPresentation)

    const { id } = useParams()
    const project = useSelector((state) => state.data.project)
    const theme = useTheme()
    const smallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const isAuth = useSelector((state) => state.auth.token)

    useEffect(() => {
        const get = async () => {
            await getProjeto(id)
        }
        get()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return !isAuth ? <Navigate to='/login' /> : (
        <Container sx={{ py: 10, bgcolor: 'background.default' }}>
            <NavBar />
            {project ? (!smallScreen ? (
                <Stack spacing={2} sx={{ my: 5 }}>
                    <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
                        <Stack spacing={2} sx={{ mb: 2, flexGrow: 1, maxWidth: '568px' }}>
                            <DadosCliente data={project.dadosCliente} projectId={project._id} />
                            <Custos data={project.custos}/>
                        </Stack>
                        <Stack spacing={2} sx={{ flexGrow: 1, maxWidth: '568px' }}>
                            <DadosProjeto data={project.dadosProjeto} projectId={project._id} />
                            <Timeline data={project.timeline} projectId={project._id} />
                        </Stack>
                    </Stack>
                    <Insumos data={project.insumos} projectId={project._id} />
                </Stack>
            ) : (
                <Stack direction='column' spacing={2} sx={{ width: '100%' }} alignItems={'center'}>
                    <DadosCliente data={project.dadosCliente} projectId={project._id} />
                    <DadosProjeto data={project.dadosProjeto} projectId={project._id} />
                    <Custos data={project.custos} projectId={project._id} />
                    <Timeline data={project.timeline} projectId={project._id} />
                    <Insumos data={project.insumos} projectId={project._id} />
                </Stack>
            )) : (
                (!smallScreen ? (
                    <Stack spacing={2} sx={{ my: 5 }}>
                        <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
                            <Stack spacing={2} sx={{ mb: 2, flexGrow: 1, maxWidth: '568px' }}>
                                <Skeleton animation="wave" height={'450px'} width={'100%'} variant='rounded' />
                                <Skeleton animation="wave" height={'450px'} width={'100%'} variant='rounded' />
                            </Stack>
                            <Stack spacing={2} sx={{ flexGrow: 1, maxWidth: '568px' }}>
                                <Skeleton animation="wave" height={'450px'} width={'100%'} variant='rounded' />
                                <Skeleton animation="wave" height={'450px'} width={'100%'} variant='rounded' />
                            </Stack>
                        </Stack>
                        <Skeleton animation="wave" height={'100px'} width={'100%'} variant='rounded' />
                    </Stack>
                ) : (
                    <Stack direction='column' spacing={2} sx={{ width: '100%' }} alignItems={'center'}>
                        <Skeleton animation="wave" height={'450px'} width={'100%'} variant='rounded' />
                        <Skeleton animation="wave" height={'450px'} width={'100%'} variant='rounded' />
                        <Skeleton animation="wave" height={'450px'} width={'100%'} variant='rounded' />
                        <Skeleton animation="wave" height={'450px'} width={'100%'} variant='rounded' />
                        <Skeleton animation="wave" height={'100px'} width={'100%'} variant='rounded' />
                    </Stack>
                )
                ))}
        </Container>
    )
}

export default Index