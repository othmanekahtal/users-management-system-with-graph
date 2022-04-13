import ErrorImage from './../assets/500.svg'
export const Error500 = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-1/3">
        <img src={ErrorImage} alt="error 404" />
      </div>
      <div>Don't worry we try to fix problem !</div>
    </div>
  )
}
