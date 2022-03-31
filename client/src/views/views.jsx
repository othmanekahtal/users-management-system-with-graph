import {Navigate, Route, Routes} from 'react-router-dom'
import SignUp from './sign-up'
import SignIn from './sign-in'
import Home from './home'
const Views = () => (
  <Routes>
    <Route index element={<div>index</div>} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/home" element={<Home />} />
    <Route path="/dashboard" element={<Navigate to="/home" />} />
    <Route path="/users">
      <Route index element={<Home />} />
      <Route path="add-user" element={<>add user</>} />
      <Route path="update-user/:id" element={<>update user</>} />
    </Route>
    <Route path="*" element={<div>Not found</div>} />
  </Routes>
)

export default Views
