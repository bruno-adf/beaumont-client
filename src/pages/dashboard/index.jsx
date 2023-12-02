import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Container, Typography, Grid, Divider, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material'
import ListItem from './ListItem'
import NavBar from 'components/NavBar'
import { getProjetos } from 'api/projetos'
import { clear } from 'state/dataSlice'

function Index() {

  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('lg'))
  const list = useSelector((state) => state.data.list)
  const dispatch = useDispatch()
  const isAuth = Boolean(useSelector((state) => state.auth.token))

  useEffect(() => {
    const get = async () => {
      await getProjetos()
      dispatch(clear())
    }
    get()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isAuth === false ? <Navigate to='/login' /> : (
    <Container bgcolor='background.default' sx={{ py: small ? 10 : 15, height: '100vh' }}>
      <NavBar create>
        <Container sx={{
          width: '100%',
          py: '5px'
        }}>
          <Grid container sx={{ px: 2, color: 'white' }}>
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: 'bold' }}>Nome</Typography>
            </Grid>
            <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px', height: '10px', alignSelf: 'center' }} />
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'Bold' }}>Ambientes</Typography>
            </Grid>
            <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px', height: '10px', alignSelf: 'center' }} />
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'Bold' }}>Início</Typography>
            </Grid>
            <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px', height: '10px', alignSelf: 'center' }} />
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'Bold' }}>Entrega</Typography>
            </Grid>
            <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px', height: '10px', alignSelf: 'center' }} />
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'Bold' }}>Insumos</Typography>
            </Grid>
            <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px', height: '10px', alignSelf: 'center' }} />
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'Bold' }}>Valor total</Typography>
            </Grid>
            <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px', height: '10px', alignSelf: 'center' }} />
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'Bold' }}>Responsáveis</Typography>
            </Grid>
            <Divider color='white' orientation='vertical' flexItem sx={{ mr: '-1px', height: '10px', alignSelf: 'center' }} />
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'Bold' }}>Status</Typography>
            </Grid>
          </Grid>
        </Container>
      </NavBar>
      {list ? list.map((project, key) => (
        <ListItem key={key} data={project} />
      )) : (
        <Stack spacing={1}>
          <Skeleton opacity='' variant="rounded" width={'100%'} height={small ? 114 : 58.84}></Skeleton>
          <Skeleton sx={{ opacity: 0.7 }} variant="rounded" width={'100%'} height={small ? 114 : 58.84}></Skeleton>
          <Skeleton sx={{ opacity: 0.3 }} variant="rounded" width={'100%'} height={small ? 114 : 58.84}></Skeleton>
        </Stack>
      )}
    </Container>
  )
}

export default Index