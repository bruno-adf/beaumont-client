import { Card, Box, Stack, TextField, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const TagInput = ({ tagArray, handleRemove, handleAdd, handleInputChange, value, label }) => {
    return (
        <Box sx={{ paddingTop: 1 }}>
            <Typography sx={{marginBottom: 1}} fontSize={'0.8rem'}>Ambientes</Typography>
            <Grid container>
                {tagArray.map((el, key) => (
                    <Grid item>
                        <Card sx={{ padding: '5px', width: 'fit-content' }} key={key}>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Box sx={{ marginRight: 1, height: '16px', "&:hover": { cursor: 'pointer' } }}>
                                    <FaTimes onClick={() => handleRemove(key)} />
                                </Box>
                                {el}
                            </Stack>
                        </Card>
                    </Grid>
                ))}
                <Grid item>
                    <TextField
                        sx={{
                            height: '10px'
                        }}
                        onKeyDown={handleAdd}
                        size={'small'}
                        placeholder='Novo ambiente'
                        value={value}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default TagInput