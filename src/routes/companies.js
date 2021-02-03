import react, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import {useInput,useApi,useFlip, useLocalStorage} from '../hooks'
import CompanyDetail from './pageComponents/companydetail'

const Companies = ()=> {
    // get list of all companies
    const [compData,getAllCompanies] = useApi()
    const [isLoading,stopLoading] = useFlip()
    const [isLoggedIn,LogIn] = useLocalStorage()
    
    useEffect(async()=> {
        LogIn()
        if(isLoggedIn){
            await getAllCompanies("companies")
            stopLoading()
        }
    },[])

    const [input,handleChange] = useInput({"search":null})

    async function handleClick(e){
        e.preventDefault()
        
        if(input.search){

            localStorage.setItem("filter",
            [input.search.toLowerCase(),input.search.toUpperCase()])       
            await getAllCompanies("companies")
        } else {
            await getAllCompanies("companies")
        }
    }


    if(!isLoggedIn){
        return <Redirect to="/" />
    }

    return(
        <div>
            
            <form>
                <div>
                    <input type="text" id="search" name="search" onChange={handleChange}/>
                    <button onClick={handleClick}>Submit</button>
                </div>
            </form>
            {isLoading && <div>
                    <h3>Loading...</h3>
                </div>}
            {!isLoading && <div>
            {compData.map(company => 
                <CompanyDetail company={company} />)}
            </div>
            }
        </div>
    )
}

export default Companies;