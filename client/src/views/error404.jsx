import ErrorImage from './../assets/404.svg'
import {Link} from 'react-router-dom'
import {Button} from '@mui/material'
export const Error404 = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-1/3">
        <img src={ErrorImage} alt="error 404" />
      </div>
      <Link to="/">
        <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
          return to home
        </Button>
      </Link>
    </div>
  )
}
