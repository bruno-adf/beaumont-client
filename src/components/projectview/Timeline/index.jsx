import React from 'react'
import { Card, Typography, Stack } from '@mui/material'
import StatusList from 'StatusList'
import dayjs from 'dayjs'
import { FaAngleDoubleRight } from 'react-icons/fa'

function Timeline({ data }) {

    return (
        <Card
            variant='outlined'
            sx={{
                flexGrow: 1,
                height: '450px',
                p: 3,
                width: '100%'
            }}
        >
            <Stack spacing={2} height='100%'>
                <Typography variant='h6' fontWeight={'Bold'}>Linha do tempo</Typography>
                <Card
                    variant='outlined'
                    sx={{
                        height: '100%',
                        overflowY: 'scroll',
                    }}
                >
                    {data.map((item, key) => (
                        <Card key={key} sx={{ p: 2, m: 1 }} variant='outlined'>
                            <Typography fontSize={'0.8rem'} fontWeight={'Bold'}>
                                {!isNaN(item.prev_status) ? StatusList[item.prev_status] : item.prev_status}
                                <FaAngleDoubleRight size={'12px'} style={{margin: '0 5px'}}/>
                                {!isNaN(item.new_status) ? StatusList[item.new_status] : item.new_status}
                            </Typography>
                            <Typography fontSize={'0.8rem'}>{`${dayjs(item.data).format("DD [de] MMMM [de] YYYY [às] HH:mm")} - ${item.responsavel}`}</Typography>
                        </Card>
                    ))}
                </Card>
            </Stack>
        </Card>
    )
}

export default Timeline