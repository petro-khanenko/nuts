import BasketButton from "../BasketButton";
import {useLocation} from "react-router-dom";
import {apiRoutes, mainRoutes} from "../../constants/constants";
import React, {useCallback, useEffect} from "react";
import {useScrollData} from "../../context/ScrollContext";
import {useHttp} from "../../hooks/http.hook";
import {useItemsData} from "../../context/ItemsContext";

const MainContainer = ({children}) => {

    const {pathname} = useLocation();
    const { onSetItems } = useItemsData();
    const {setPageY} = useScrollData();
    const {request} = useHttp();

    const fetchItems = useCallback(async () => {
        const data = await request(`/${apiRoutes.ITEMS}`);
        const sortItems = data.sort((a, b) => a.article > b.article ? 1 : a.article < b.article ? -1 : 0);
        onSetItems(sortItems);
    }, [request]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

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

export default MainContainer;