import {createContext, useReducer} from 'react'
export const Context = createContext()

export default function Provider(props) {
  function reducer(state, {action, value}) {
    let newState = {...state}
    switch (action) {
      case 'authorize':
        newState = {
          token: value,
        }
        break
      case 'logout':
        newState = {
          token: null,
        }
        break
      default:
        throw Error(`Action ${action} not found`)
    }
    return newState
  }
  const [{token}, dispatcher] = useReducer(reducer, {
    token: localStorage.getItem('token') ?? null,
  })
  const value = [{token}, dispatcher]
  return <Context.Provider value={value} {...props}></Context.Provider>
}
