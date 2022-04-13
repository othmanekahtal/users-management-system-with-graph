import {Navigate, Route, Routes} from 'react-router-dom'
import SignUp from './sign-up'
import SignIn from './sign-in'
import Home from './home'
import AuthGuard from '../guard/auth.guard'
import {Error404} from './error404'

const Views = () => (
  <Routes>
    <Route index element={<Navigate to="/users" />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/home" element={<Navigate to="/users" />} />
    <Route path="/dashboard" element={<Navigate to="/users" />} />
    <Route path="/users">
      <Route
        index
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
      <Route
        path="add-user"
        element={
          <AuthGuard>
            <div>add user</div>
          </AuthGuard>
        }
      />
      <Route
        path="update-user/:id"
        element={
          <AuthGuard>
            <div>update user</div>
          </AuthGuard>
        }
      />
    </Route>
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default Views
