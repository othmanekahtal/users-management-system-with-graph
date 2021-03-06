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
import {Link as LinkReact} from 'react-router-dom'
import {useMutation} from '@apollo/client'
import {CREATE_USER_MUTATION} from '././../graphql/mutations/users'
import toast from 'react-hot-toast'
import {Error500} from './error500'
import {useNavigate} from 'react-router-dom'
const theme = createTheme()
export default function SignUp() {
  const navigate = useNavigate()

  const [mutate_creation, {error}] = useMutation(CREATE_USER_MUTATION)
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const input = {
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
    }
    console.log(input)
    if (!input.email | !input.password | !input.firstName | !input.lastName) {
      toast.error('Please fill all the fields')
      return
    }
    mutate_creation({
      variables: {
        input,
      },
      onCompleted: ({createUser}) => {
        console.log(createUser)
        toast.success('You are now registered')
        navigate('/sign-in')
      },
    })
  }
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2">
                  <LinkReact to={'/sign-in'}>
                    Already have an account? Sign in
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
