import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Container, Skeleton, Stack, useMediaQuery, useTheme, Box, Tabs, Tab, TabPanel, IconButton } from '@mui/material'
import ListItem from './ListItem'
import NavBar from 'components/NavBar'
import { getProjetos } from 'api/projetos'
import { clear } from 'state/dataSlice'
import { FaFilter } from 'react-icons/fa'

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

  const [tab, setTab] = useState(0)

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  const TabSection = (props) => {
    const { index, value, children } = props

    return (
      <div hidden={index !== value}>
        {children}
      </div>
    )
  }

  return isAuth === false ? <Navigate to='/login' /> : (
    <Container sx={{ bgcolor: 'background.default', py: 10, height: '100vh' }}>
      <NavBar create>
        {/* <Container sx={{
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
        </Container> */}
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
      <Stack justifyContent={'space-between'} direction={'row'} sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label='Projetos'/>
          <Tab label='Seus projetos'/>
        </Tabs>
        <IconButton color='primary' size='small'>
          <FaFilter/>
        </IconButton>
      </Stack>
      <TabSection index={0} value={tab}>
        {list ? list.map((project, key) => (
          <ListItem key={key} data={project} />
        )) : (
          <Stack spacing={1}>
            <Skeleton opacity='' variant="rounded" width={'100%'} height={58.84}></Skeleton>
            <Skeleton sx={{ opacity: 0.7 }} variant="rounded" width={'100%'} height={small ? 58.84 : 114}></Skeleton>
            <Skeleton sx={{ opacity: 0.3 }} variant="rounded" width={'100%'} height={small ? 58.84 : 114}></Skeleton>
          </Stack>
        )}
      </TabSection>
      <TabSection index={1} value={tab}>
          aaa
      </TabSection>
    </Container>
  )
}

export default Index