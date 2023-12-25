import React, { useState } from 'react'
import { Box, Menu, MenuItem, Chip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { set } from 'state/dataSlice'
import StatusList from 'StatusList'
import { updateStatus } from 'services/dadosprojeto'

function StatusIndicator(props) {

    const project = useSelector((state) => state.data.project)
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleItemClick = async (event, index) => {
        await updateStatus(index)
        setAnchorEl(null)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

  return (
    <Box>
        <Chip
        id='status-button'
        aria-controls={'status'}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='listbox'
        onClick={props.unlocked && handleClick}
        label={StatusList[project ? project.dadosProjeto.status : props.index]}
        color='primary'
        size='small'
        sx={{width: '180px'}}
        />
        <Menu
        id='status'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'status-button',
            role: 'listbox'
        }}
        >
            {
                StatusList.map((status, index) => (
                    <MenuItem
                    key={status}
                    disabled={index === 0}
                    selected={index === (project ? project.dadosProjeto.status : props.index)}
                    onClick={(event) => handleItemClick(event, index)}
                    >
                    {status}
                    </MenuItem>
                ))
            }
        </Menu>
    </Box>
  )
}

export default StatusIndicator