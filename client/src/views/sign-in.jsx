import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Link as LinkReact, useNavigate} from 'react-router-dom'
import {useMutation} from '@apollo/client'
import {AUTHORIZE_USER_MUTATION} from '././../graphql/mutations/users'
import toast from 'react-hot-toast'
import {Context} from '../context/provider'
import {Error500} from './error500'
import {Loading} from '../components/loading'

const theme = createTheme()
export default function SignIn() {
  const [{token}, dispatcher] = React.useContext(Context)
  const [mutate_authorization, {loading, error}] = useMutation(
    AUTHORIZE_USER_MUTATION,
  )
  const navigate = useNavigate()
  if (token) {
    navigate('/')
  }
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (!data.get('email') | !data.get('password')) {
      toast.error('Please fill all the fields')
      return
    }
    mutate_authorization({
      variables: {
        email: data.get('email'),
        password: data.get('password'),
      },
      onCompleted: ({authorizeUser}) => {
        localStorage.setItem('token', authorizeUser.token)
        dispatcher({
          action: 'authorize',
          value: authorizeUser.token,
        })
        console.log(token)
        toast.success('You are now authorized')
        navigate('../', {replace: true})
      },
    })
  }
  if (loading) return <Loading />
  if (error?.networkError) {
    return <Error500 />
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2">
                  <LinkReact to={'/sign-up'}>
                    don't have an account? Sign up
                  </LinkReact>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
