import react, { useEffect, useState, useContext } from 'react'
import {useApi,useFlip, useInput, useLocalStorage} from '../hooks'
import {Redirect} from 'react-router-dom'
import JobDetail from './pageComponents/jobDetails'
import UserContext from './pageComponents/UserContext'

const Jobs = ({applications})=> {
    const [jobsData,getJobsData] = useApi()
    const [isLoading,stopLoading] = useFlip()
    const [loggedIn,changeLogin] = useLocalStorage()

    useEffect(async()=> {
        changeLogin()
        if(loggedIn){
        await getJobsData("jobs")
        stopLoading()
        }
    },[])
    
    const [jobSearch,handleSearch] = useInput({"search":null})

    async function handleClick(e){
        e.preventDefault()
        
        if(jobSearch.search){

            localStorage.setItem("jobFilter",
            [jobSearch.search.toLowerCase(),jobSearch.search.toUpperCase()])       
            await getJobsData("jobs")
        } else {
            await getJobsData("jobs")
        }
    }

    if(!loggedIn){
        return <Redirect to="/" />
    }
    
    return(
        <div>
            <form>
                <div>
                    <input type="text" id="search" name="search" onChange={handleSearch}/>
                    <button onClick={handleClick}>Submit</button>
                </div>
            </form>
            {isLoading && 
                <div>
                    <h1>Loading...</h1>
                </div>}
            {!isLoading &&
            <div>
            {jobsData.map(job => <JobDetail info={job} applications={applications} />)}
            </div>
            }
        </div>
    )
}

export default Jobs;