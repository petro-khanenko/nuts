import React from 'react'

const CompanyRemastering = ({company, updateCompany, deleteCompany, idx}) => {

    return (
    <div className={'remast'}>
        <div className={'remast__tittle'}>
            {idx + 1}. {company.name}
        </div>
        <div className={'remast__options'}>
            <button onClick={() => updateCompany(company)}>Update</button>
            <button onClick={() => deleteCompany(company)}>Delete</button>
        </div>
    </div>
    )
}

export default CompanyRemastering
