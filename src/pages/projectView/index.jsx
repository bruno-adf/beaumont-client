import React, { useEffect, useState } from 'react'
import DadosCliente from './DadosCliente'
import DadosProjeto from './DadosProjeto'
import { Container, Stack, useMediaQuery, useTheme } from '@mui/material'
import Custos from './Custos'
import Timeline from './Timeline'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Insumos from './insumos/Insumos'
import NavBar from 'components/NavBar'
import { getProjeto } from 'api/projetos'
import { useParams } from 'react-router-dom'
import { set } from 'state/dataSlice'

function Index() {

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
    },[])

    return !isAuth ? <Navigate to='/login' /> : (
        <Container sx={{py: 10}}>
            <NavBar/>
            {project && (!smallScreen ? (
                <Stack spacing={2} sx={{my: 5}}>
                    <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
                        <Stack spacing={2} sx={{ mb: 2, flexGrow: 1, maxWidth: '568px' }}>
                            <DadosCliente data={project.dadosCliente} projectId={project._id}/>
                            <Custos data={project.custos} projectId={project._id}/>
                        </Stack>
                        <Stack spacing={2} sx={{ flexGrow: 1, maxWidth: '568px' }}>
                            <DadosProjeto data={project.dadosProjeto} projectId={project._id}/>
                            <Timeline data={project.timeline} projectId={project._id}/>
                        </Stack>
                    </Stack>
                    <Insumos  data={project.insumos} projectId={project._id}/>
                </Stack>
            ) : (
                <Stack direction='column' spacing={2} sx={{ width: '100%' }} alignItems={'center'}>
                    <DadosCliente data={project.dadosCliente} projectId={project._id}/>
                    <DadosProjeto data={project.dadosProjeto} projectId={project._id}/>
                    <Custos data={project.custos} projectId={project._id}/>
                    <Timeline data={project.timeline} projectId={project._id}/>
                    <Insumos data={project.insumos} projectId={project._id}/>
                </Stack>
            ))}
        </Container>
    )
}

export default Index