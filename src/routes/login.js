import react, {useEffect} from 'react'
import {useFlip, useInput, useApi} from '../hooks'
import {Redirect} from 'react-router-dom'

const Login = () => {
    const [signedOut,changeSignedOut] = useFlip()
    const [credentials,handleChange] = useInput()
    const [data,loginUser] = useApi(credentials)

    useEffect(()=>{
        if(localStorage.getItem("token") && localStorage.getItem("token") !== ""){
            changeSignedOut()
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
            loginUser('login')
            changeSignedOut()
        } catch(e){

        }
    }

    if(!signedOut){
        return <Redirect to="/" /> 
    }

    return (
        <div>
        {signedOut &&
        <form>
            <div>
                <label for="username">Username: </label>
                <input type="text" name="username" id="username" onChange={handleChange}/>
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" onChange={handleChange}/>
            </div>
            <button onClick={handleClick}>Login</button>
        </form>
        }
        </div>
    )
}

export default Login;