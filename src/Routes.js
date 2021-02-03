import react, {useEffect, useState} from 'react'
import jwt from 'jsonwebtoken'
import JoblyApi from './axios'
import {Route,Switch,Redirect} from 'react-router-dom'
import Nav from '../src/nav'
import Home from './routes/home'
import SignUp from './routes/sign-up';
import Login from './routes/login';
import Companies from './routes/companies';
import Company from './routes/company'
import Jobs from './routes/jobs'
import Profile from './routes/profile'
import LogOut from './routes/logout'
import UserContext from '../src/routes/pageComponents/UserContext'


const Routes = () => {
    const [currUser,updateUser] = useState({})

    const user = jwt.decode(localStorage.token)
    async function getUserData(){
        const userData = await (JoblyApi.getUser(user.username))
        updateUser(userData)
    }
    
    useEffect(() => {
    if(localStorage.token){
      getUserData()
    }
    },[])

    return (
        <UserContext.Provider value={currUser}>
            <Nav />
            <Switch>  
                <Route exact path="/"><Home /></Route>
                <Route exact path="/sign-up"><SignUp/></Route>
                <Route exact path='/login'><Login/></Route>
                <Route exact path='/logout'><LogOut/></Route>
                <Route exact path='/profile'><Profile/></Route>
                <Route exact path='/companies'><Companies/></Route>
                <Route exact path='/companies/:handle'><Company/></Route>
                <Route exact path='/jobs'><Jobs applications={currUser.applications}/></Route>
                <Redirect to="/"><Home /></Redirect>
            </Switch>
      </UserContext.Provider>
    )
}

export default Routes;