import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import { logOutAsync, selectLoggedInUser } from '../authSlice'
const Logout = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    useEffect(()=>{
        dispatch(logOutAsync())
    })
  return (
    <div>
      {!user && <Navigate to="/" replace={true}></Navigate>}
    </div>
  )
}

export default Logout
