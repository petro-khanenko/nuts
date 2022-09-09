import React from 'react'
import {NavLink, useLocation} from "react-router-dom";
import {useBasketData} from "../../../context/BasketContext";
import {useScrollData} from "../../../context/ScrollContext";

const ItemCard = ({ item }) => {
    const {pathname} = useLocation();
    const {addItemToBasket} = useBasketData();
    const {setPageY} = useScrollData();

    // Handlers
    const handleGoToBasket = () => {
        if (pathname === '/') setPageY(window.pageYOffset);
    };

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
            <button onClick={() => addItemToBasket(item)}>Купити</button>
        </div>
    );
}

export default ItemCard;
