import BasketButton from "../BasketButton";
import {Route, Switch, useLocation} from "react-router-dom";
import Content from "../../pages/main/Content";
import {mainRoutes, params, subRoutes} from "../../constants/constants";
import AboutItem from "../../pages/about/AboutItem";
import Delivery from "../../pages/delivery/Delivery";
import Basket from "../../pages/basket/Basket";
import Auth from "../../pages/admin/Auth";
import AdminPanel from "../../pages/admin/AdminPanel";
import {AdminBasket} from "../../pages/admin/AdminPanel/AdminBasket";
import React, {useState} from "react";
import {useScrollData} from "../../context/ScrollContext";

const MainLayout = ({children}) => {
    const {pathname} = useLocation();
    const {setPageY} = useScrollData();

    const handleGoToBasket = () => {
        if (pathname === '/') setPageY(window.pageYOffset);
    };

    const showBasket = !pathname.includes(mainRoutes.BASKET) && !pathname.includes(mainRoutes.ADMIN);

    return (
        <div className={'app'}>
            {
                showBasket && <BasketButton onGoToBasket={handleGoToBasket}/>
            }
            { children }
        </div>

    );
};

export default MainLayout;