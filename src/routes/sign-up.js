import react, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import {useApi, useInput, useFlip} from '../hooks'

const SignUp = () => {
    const [loggedOut,changeLoggedOut] = useFlip()
    const [input,handleChange] = useInput()
    const [data,createUser] = useApi(input)

    useEffect(()=>{
        if(localStorage.getItem("token") && localStorage.getItem("token") !== ""){
            changeLoggedOut()
        }
    },[])

    
    const handleClick = async(e) => {
        e.preventDefault()
        for(let child of e.target.form){
            const {name,value} = child
            if(name !== ""){
                if(value === ""){
                    return
                }
            }
        }
        
        try {
            createUser('register')
            changeLoggedOut()
        } catch(e){

        }
    }


    return (
        <div>
        {loggedOut &&
        <form>
            <div>
                <label htmlFor="">Username: </label>
                <input type="text" id="username" name="username" required onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="">Password: </label>
                <input type="text" id="password" name="password" required onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="">First Name: </label>
                <input type="text" id="firstName" name="firstName" required onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="">Last Name: </label>
                <input type="text" id="lastName" name="lastName" required onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="">Email: </label>
                <input type="text" id="email" name="email" required onChange={handleChange} />
            </div>
            <button type="submit" onClick={handleClick}>Submit</button>
        </form>
        }
        {!loggedOut && <Redirect to="/"/>}

        </div>
    )
}

export default SignUp