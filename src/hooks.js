import react, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import JoblyApi from './axios';
import jwt from 'jsonwebtoken'

const useInput = (param = "") => {
    const [input,changeInput] = useState(param)
    const handleChange = e => {
        const {name,value} = e.target;
        changeInput(()=>(
        {
            ...input,
            [name]:value
        }))
    }

    return [input,handleChange]
}

const useApi = (param = "") => {
    const [data,updateData] = useState()
    async function getData(type){
        if(type === "jobs"){
            param = localStorage.getItem("jobFilter")
            const res = await JoblyApi.getAllJobs(param)
            updateData(res)
            localStorage.setItem('jobFilter',"")
        }

        if(type === "job"){
            const res = await JoblyApi.getJob(param)
            updateData(res)
        }

        if(type === "companies"){
            param = localStorage.getItem("filter")
            const res = await JoblyApi.getAllCompanies(param)
            updateData(res)
            localStorage.setItem('filter',"")
        }

        if(type === "company"){
            try { 
                const res = await JoblyApi.getCompany(param)
                updateData(res)
            } catch (e) {
                throw(e)
            }
        }
        
        if(type === "register"){
            try {
                const res = await JoblyApi.register(param)
                localStorage.setItem("token",res)
            } catch (e){
                throw(e)
            }
        }

        if(type === 'login'){
            try {
                const res = await JoblyApi.login(param)
                localStorage.setItem("token",res)
            } catch (e){
                throw(e)
            }
        }

        if(type === 'edit'){
            try {
                const res = await JoblyApi.editUser(param)
            } catch(e){
                throw(e)
            }
        }

        if(type === 'apply'){
            try {
                const res = await JoblyApi.apply(param.id)
            } catch (e){
                throw(e)
            }
        }

    
    }
    

    return [data,getData]
}

const useFlip = () => {
    const [isLoading,changeLoading] = useState(true)

    const flip = () => {
        changeLoading(false)
    }

    return [isLoading,flip]
}

const useLocalStorage = () => {
    const [isLoggedIn,LogIn] = useState(true)

    const checkLoggedIn = () => {
        if(localStorage.getItem("token") && localStorage.getItem("token") !== ""){

        } else {
            LogIn(false)
        }
    }

    return [isLoggedIn,checkLoggedIn]
}

const useCurrentUser = () => {
    const [currUser,updateUser] = useState({})

    const user = jwt.decode(localStorage.token)

    async function getUserData(){
        const userData = await (JoblyApi.getUser(user.username))
        updateUser(userData)
    }

    return [currUser,getUserData]
}

export {useInput,useApi,useFlip, useLocalStorage, useCurrentUser}