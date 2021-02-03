import react, {useEffect, useContext} from 'react'
import {useFlip, useLocalStorage, useInput, useApi} from '../hooks'
import {Redirect} from 'react-router-dom'
import UserContext from './pageComponents/UserContext'

const Profile = () => {
    const currUser = useContext(UserContext)
    const [isLoggedIn,LogIn] = useLocalStorage()
    const [isLoading,changeLoading] = useFlip()
    const [data,handleChange] = useInput()
    const [userInfo,editUser] = useApi(currUser)
    
    useEffect(async()=> {
        LogIn()
        if(isLoggedIn){
            changeLoading()
            
        }
    },[])

    
    const handleClick = async(e) => {
        e.preventDefault()
        for(let child of e.target.form){
            if(child.name !== ""){
                if(child.value === ""){
                    let prop = child.name;
                    child.value = currUser[prop]
                }
            }
        }
        
        try {
            editUser('edit')
        } catch(e){

        }
    }


    if(!isLoggedIn){
        return <Redirect to="/" />
    }
    
    return(
        <div>
            <h1>Profile</h1>
            {!isLoading && <div>
                <p>User: {currUser.username}</p>
                <form>
                    <div>
                        <label for="firstName"> First Name: </label>
                        <input type="text" name="firstName" id="firstName" placeholder={currUser.firstName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label for="lastName">Last Name: </label>
                        <input type="text" name="lastName" id="lastName" placeholder={currUser.lastName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label for="email">Email: </label>
                        <input type="text" name="email" id="email" placeholder={currUser.email} onChange={handleChange}/>
                    </div>
                    <button onClick={handleClick}>Edit</button>
                </form>
            </div>
            }
        </div>
    )
}

export default Profile;