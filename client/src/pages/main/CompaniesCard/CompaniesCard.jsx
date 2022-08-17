import React from 'react'
import {NavLink} from "react-router-dom";
import {addItemToBasket} from "../../../utils/helpers";

const CompaniesCard = ({ company, handleGoToBasket, someShit, setSomeShit }) => {

    return (
        <div id={company.anchorr} className={"companies-card"}>
            <NavLink to={`/about/${company.anchorr}`} onClick={handleGoToBasket}>
                <div className={`companies-card__image ${!company.description && 'boss'}`}>
                    <img src={company.image} alt='image'/>
                </div>
                <div className={`companies-card__description ${company.description && 'boss'}`}>
                    {company.description}
                </div>
                <div className={`companies-card__label`}>
                    <div className="companies-card__label-name">{company.name}</div>
                    <div className="companies-card__label-price">{Number(company.price).toFixed(2)} грн/{company.points}</div>
                </div>
            </NavLink>
            <button onClick={() => addItemToBasket(company, someShit, setSomeShit)}>Купити</button>
        </div>
    )
}

export default CompaniesCard
