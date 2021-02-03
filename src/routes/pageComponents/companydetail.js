import react from 'react'
import {Link} from 'react-router-dom'

const CompanyDetails = ({company}) => {
    const link = `/companies/${company.handle}`
    return(
        <div key={company.name}>
            <h3><Link to={link}>{company.name}</Link></h3>
            <p>{company.description}</p>
        </div>
    )
}

export default CompanyDetails;