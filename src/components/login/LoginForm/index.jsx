import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import { TextField, Typography, Stack, Box, Button, CircularProgress } from '@mui/material'
import { userSchema } from 'validation/user'
import { useDispatch } from 'react-redux'
import { setLogin } from 'state/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { login } from 'services/auth'

function LoginForm() {

  const [callingApi, setCallingApi] = useState(false)

  const navigate = useNavigate()

  // const handleLogin = async (values, onSubmitProps) => {
  //   setCallingApi(true)
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_PREFIX}auth/login`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(values, onSubmitProps)
  //     })
  //     if(response.status === 200){
  //       const loggedIn = await response.json()
  //       console.log(loggedIn)
  //       onSubmitProps.resetForm()
  //       if (loggedIn) {
  //         dispatch(
  //           setLogin({
  //             user: loggedIn.user,
  //             token: loggedIn.token
  //           })
  //         )
  //       }
  //       navigate('/dashboard')
  //     }else{
  //       toast.error('Login inválido',{
  //         duration: 5000
  //       })
  //     }
  //     setCallingApi(false)
  //   } catch (error) {
  //     toast('erro')
  //   }
  // }

  const handleLogin = async (values, onSubmitProps) => {
    setCallingApi(true)

    await login(values).then((res) => {
      console.log(res)
      if(res) navigate('/dashboard')
    })

    setCallingApi(false)
  }

  return (
    <Formik
      initialValues={{
        email: '',
        pswd: ''
      }}
      validationSchema={userSchema}
      onSubmit={handleLogin}
    >
      {({ errors, touched }) => (
        <Form style={{ width: 300 }}>
          <Stack spacing={2}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant='h3' fontFamily={'Abril Fatface'} color={'text.primary'}>BEAUMONT</Typography>
            </Box>
            <Field
              name="email"
              as={TextField}
              label='E-mail'
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              size='small'
            />
            <Field
              name="pswd"
              type='password'
              as={TextField}
              label='Senha'
              error={Boolean(touched.pswd) && Boolean(errors.pswd)}
              helperText={touched.pswd && errors.pswd}
              size='small'
            />
            <Button type="submit" variant='contained'>
              {
                callingApi === true ? <CircularProgress sx={{ color: 'white' }} size={25} /> : 'Entrar'
              }
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm