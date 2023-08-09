import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import {selectLoggedInUser} from '../authSlice'
import { selectUserInfo } from '../../user/userSlice';
const ProtectAdmin = ({children}) => {
    // const user = useSelector(selectLoggedInUser);
    const user = useSelector(selectUserInfo)
    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if(user && user.role !== 'admin'){
      return <Navigate to="/" replace={true}></Navigate>
  }
  return children
    
}

export default ProtectAdmin
