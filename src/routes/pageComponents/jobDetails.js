import react, {useEffect, useContext, useRef, useState} from 'react'
import App from '../../App'
import {useApi,useFlip, useLocalStorage} from '../../hooks'
import UserContext from '../pageComponents/UserContext'

const JobDetail = ({info,applications}) => {
    // get list of all companies
    const [applied,Apply] = useState(false)
    const [jobData,getJobData] = useApi(info.id)
    const [isLoading,stopLoading] = useFlip()
    const [data,getData] = useApi(jobData)
    
    useEffect(async()=> {
        await getJobData("job")
        if(applications){
            if(applications.includes(info.id)){
                Apply(true)
            } 
        }
        stopLoading()
    },[])

    function handleClick(e){
        e.preventDefault()
        if(!applied){
            getData('apply')
        }
    }


    

    return(
        <div>
            {!isLoading && <div>
            <h3>{jobData.title}</h3>
            <p>Salary: {jobData.salary}</p>
            <p>Equity: {jobData.equity}</p>
            {!applied && <div>
                <button onClick={handleClick}>Apply</button>
                </div>
            }
            {applied && <div>
                <button onClick={handleClick}>Applied</button>
                </div>}
            </div>
            }
            
        </div>
    )
}

export default JobDetail;