import React, { useState } from 'react'
import { AppBar, Toolbar, Grid, Typography, IconButton, Button, MenuItem, Menu, useMediaQuery, useTheme } from '@mui/material'
import { FaEllipsisV, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deletarProjeto, criarProjeto } from 'api/projetos.js'
import { store } from 'state/store'
import { setLogout } from 'state/authSlice'
import { darkMode } from 'state/dataSlice'

function NavBar(props) {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState()
    const open = Boolean(anchorEl)
    const theme = useTheme()
    const small = useMediaQuery(theme.breakpoints.down('lg'))

    const handleCreate = async () => {
        await criarProjeto()
        navigate(`/projectView/${store.getState().data.project._id}`)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (event) => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        store.dispatch(setLogout())
    }

    const handleMode = () => {
        store.dispatch(darkMode())
        console.log('alternado')
    }

    const handleDelete = async () => {
        await deletarProjeto()
        navigate('/dashboard')
    }

    return (
        <AppBar position='fixed' component="container">
            <Toolbar variant="dense">
                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={3}>
                        <Typography onClick={() => navigate('/dashboard')} variant="h5" fontFamily={'Abril Fatface'} color={'white'} flexGrow={1} sx={{
                            ml: 2,
                            mt: '4px',
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}>
                            BEAUMONT
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: '5px'
                    }}>
                    </Grid>
                    <Grid item xs={3} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end'
                    }}>
                        <IconButton
                        color="inherit" 
                        ria-label="menu"
                        sx={{ mr: 2 }}
                        id='options-button'
                        aria-controls={'options'}
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                            <FaEllipsisV />
                        </IconButton>
                        <Menu
                            id='options'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'options-button'
                            }}
                        >
                                    <MenuItem onClick={handleLogout}>
                                        Sair
                                    </MenuItem>
                                    {props.create ? 
                                        <MenuItem onClick={handleCreate}>
                                            Novo projeto
                                        </MenuItem>
                                    :
                                        <MenuItem onClick={handleDelete}>
                                            Excluir projeto
                                        </MenuItem>
                                    }<MenuItem onClick={handleMode}>
                                    Alternar tema
                                    </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
            {!small && props.children}
        </AppBar>
    )
}

export default NavBar