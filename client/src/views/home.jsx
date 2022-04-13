import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {grey, red} from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import {useMutation, useQuery} from '@apollo/client'
import {GET_ALL_USERS_QUERY} from '../graphql/queries/users'
import {DELETE_USER_MUTATION} from '../graphql/mutations/users'
import {Error500} from './error500'
import {useNavigate} from 'react-router-dom'
import {Loading} from '../components/loading'
import {Context} from '../context/provider'
const theme = createTheme()
export default function Home() {
  const navigate = useNavigate()
  const [, dispatcher] = React.useContext(Context)
  const {
    loading,
    error,
    data: users,
  } = useQuery(GET_ALL_USERS_QUERY, {
    onError: ({graphQLErrors}) => {
      if (graphQLErrors.length) {
        graphQLErrors.forEach(({message, locations, path, extensions}) => {
          if (extensions.code === 'UNAUTHENTICATED') {
            dispatcher({action: 'logout'})
            navigate('/sign-in')
          }
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
        })
      }
    },
  })
  const [delete_mutation] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [GET_ALL_USERS_QUERY],
  })
  if (loading) return <Loading />
  if (error?.networkError) {
    return <Error500 />
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            mb={3}
          >
            <Typography component="h1" variant="h5">
              all users available in the system:
            </Typography>
            <Link to="add-user">
              <Button variant="outlined" startIcon={<AddIcon />}>
                add User
              </Button>
            </Link>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">firstName</TableCell>
                  <TableCell align="center">lastName</TableCell>
                  <TableCell align="center">email</TableCell>
                  <TableCell align="center">actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.getUsers.map(row => (
                  <TableRow
                    key={row.id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          delete_mutation({
                            variables: {input: {id: row.id}},
                          })
                        }}
                      >
                        <DeleteIcon sx={{color: red[500]}} />
                      </IconButton>
                      <IconButton aria-label="edit">
                        <EditIcon sx={{color: grey[500]}} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
