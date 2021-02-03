import react, { useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useFlip } from '../hooks';

const LogOut = () => {
    
    localStorage.setItem('token','')


    return (
        <div>
            <Redirect to="/" />
        </div>
    )
}

export default LogOut;