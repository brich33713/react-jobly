import react, { useEffect, useState, useContext } from 'react'
import {NavLink} from 'react-router-dom'
import {useLocalStorage} from './hooks'
import UserContext from './routes/pageComponents/UserContext'


const Nav = () => {
    const currUser = useContext(UserContext)
    const [signedIn,changeSignIn] = useLocalStorage()

    useEffect(async()=>{
        changeSignIn()
    },[])

    return (
        <div>
        <NavLink exact to='/'>Home</NavLink>
        {signedIn &&
        <div>
        <NavLink exact to="/jobs">
            Jobs
        </NavLink>
        <NavLink exact to="/companies">
            Companies
        </NavLink>
        <NavLink exact to="/profile">
            Profile
        </NavLink>
        <NavLink exact to="/logout">
            Log Out {currUser.username}
        </NavLink>
        </div>
        }

        {!signedIn &&
        <div>
        <NavLink exact to="/sign-up">
          Sign Up
        </NavLink>
        <NavLink exact to="/login">
            Login
        </NavLink>
        </div>
        }   
        </div>
        
    )
}

export default Nav;