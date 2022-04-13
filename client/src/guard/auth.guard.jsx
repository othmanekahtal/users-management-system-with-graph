import {useContext, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {Context} from '../context/provider'
import toast from 'react-hot-toast'

export default function AuthGuard({children}) {
  const [{token}] = useContext(Context)
  useEffect(() => {
    if (!token) toast.error('You are not authorized to view this page')
  }, [token])
  if (token) return <>{children}</>
  return <Navigate to="/sign-in" />
}
