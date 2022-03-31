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

const theme = createTheme()

export default function SignIn() {
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
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
