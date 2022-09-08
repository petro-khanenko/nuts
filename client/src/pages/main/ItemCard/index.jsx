import React from 'react'
import {NavLink} from "react-router-dom";
import {addItemToBasket} from "../../../helpers/helpers";

const ItemCard = ({ item, handleGoToBasket, someShit, setSomeShit }) => {

    return (
        <div id={item.anchorr} className={"companies-card"}>
            <NavLink to={`/about/${item.anchorr}`} onClick={handleGoToBasket}>
                <div className={`companies-card__image ${!item.description && 'boss'}`}>
                    <img src={item.image} alt='image'/>
                </div>
                <div className={`companies-card__description ${item.description && 'boss'}`}>
                    {item.description}
                </div>
                <div className={`companies-card__label`}>
                    <div className="companies-card__label-name">{item.name}</div>
                    <div className="companies-card__label-price">{Number(item.price).toFixed(2)} грн/{item.points}</div>
                </div>
            </NavLink>
            <button onClick={() => addItemToBasket(item, someShit, setSomeShit)}>Купити</button>
        </div>
    )
}

export default ItemCard
