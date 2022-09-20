import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {IconButton, makeStyles} from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import {localStorageKeys, mainRoutes, subRoutes} from "../../constants/constants";
import {useBasketData} from "../../context/BasketContext";

const useStyles = makeStyles((theme) => ({
        headerIcon: {
            minWidth: 50,
            maxWidth: 75,
            marginLeft: 25,
            backgroundColor: 'rgba(0,0,0,0.4)',
        },
        basketIcon: {
            fontSize: 50,
            color: '#bdb5b5',
        }
    })
);

const BasketButton = ({ onGoToBasket }) => {
    const { headerIcon, basketIcon } = useStyles();
    const {itemsCount} = useBasketData();

    return (
        <div className={"button-basket__icon"}>
            <div className={"button-basket__icon_fixed"}>
                                <span className={"button-basket__inbasket"}>
                                    {itemsCount ? itemsCount : ''}
                                </span>
                <NavLink to={`/${mainRoutes.BASKET}`} onClick={onGoToBasket}>
                    <IconButton className={headerIcon}>
                        <ShoppingCart className={basketIcon}/>
                    </IconButton>
                </NavLink>
            </div>
        </div>
    );
}

export default BasketButton;
