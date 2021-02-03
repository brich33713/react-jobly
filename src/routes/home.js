import react, {useEffect,useState} from 'react'

const Home = () => {
    const [signedIn,changeSignIn] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem("logged") === 'yes'){
            changeSignIn(true)
        }
    },[signedIn])
    
    return (
        <div>
            {!signedIn && 
            <div>
                <h1>Jobly</h1>
                <p>Get Your Job Today!</p>
            </div>
            }
        </div>
    )
}

export default Home;