import React from 'react';
import { Container } from '@mui/material'
import LoginForm from './LoginForm';

function Index() {

  return (
    <Container sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      bgcolor: 'background.default'
    }}
    >
      <LoginForm/>
    </Container>
  )
};

export default Index