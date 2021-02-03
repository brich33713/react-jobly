import react, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import JobDetail from './pageComponents/jobDetails'
import {useApi, useFlip, useLocalStorage} from '../hooks'

const Company = () => {
  const {handle} = useParams();
    const [singleComp,getComp] = useApi(handle)
    const [isLoading,stopLoading] = useFlip()
    const [found,couldFind] = useFlip()
    const [isLoggedIn,LogIn] = useLocalStorage()

    useEffect(async()=> {
        LogIn()
        if(isLoggedIn){
        try {
            await getComp("company")
            stopLoading()
        }catch(e){
            couldFind()
        }
        }
    },[])

    //if can't find company redirect
    if(!found){
        return <Redirect to="/" />
    }

    //if not logged in redirect
    if(!isLoggedIn){
        return <Redirect to="/" />
    }
    
    
    return (
        <div>
        {!isLoading && <div>
            <h3>{singleComp.name}</h3>
            <p>{singleComp.description}</p>
            {singleComp.jobs.map(job => <JobDetail info={job}/>)}
        </div>
        }
        </div>
    )
}

export default Company;