import {createContext, useContext, useState} from 'react';
import {isEqual} from "lodash";
import {setSuccessModal} from "../utils/swal/helpers";
import {getFromStorage, setItemsToStorage} from "../helpers/helpers";
import {localStorageKeys} from "../constants/constants";


const BasketContext = createContext();

export const BasketContextProvider = ({children}) => {

    const [order, setOrder] = useState({});
    const [itemsCount, setItemsCount] = useState(getFromStorage(localStorageKeys.ITEMS_COUNT) || 0);
    const [basketItems, setBasketItems] = useState(getFromStorage(localStorageKeys.BASKET) || {});

    const handleOrder = (order) => {
        setOrder(order);
        const items = (order.items || []).reduce((acc, el) => ({...acc, [el.name]: el}), {});
        setItemsToStorage(items);
        setBasketItems(items);
        setItemsCount(Object.keys(items).length);
    };

    const addItemToBasket = (item) => {
        const items = {
            ...basketItems, [item.name]: {...item, count: 1, total: item.price}
        };
        setItemsToStorage(items);
        setBasketItems(items);
        setItemsCount(Object.keys(items).length);
        setSuccessModal('Товар успішно доданий в корзину!');
    };

    const removeItemFromBasket = (item) => {
        const items = Object.values(basketItems).reduce((acc, el) => isEqual(item, el) ? acc : {...acc, [el.name]: el}, {});
        setItemsToStorage(items);
        setBasketItems(items);
        setItemsCount(Object.keys(items).length);
    };

    const setCountAndTotalOfItem = (actualCounter, item) => {
        const items = {
            ...basketItems, [item.name]: {
                ...item,
                count: actualCounter,
                total: item.price * actualCounter
            }
        };
        setItemsToStorage(items);
        setBasketItems(items);
    };

    const clearBasket = () => {
        localStorage.removeItem(localStorageKeys.BASKET);
        localStorage.removeItem(localStorageKeys.ITEMS_COUNT);
        setBasketItems({});
        setItemsCount(0);
    };

    return (
        <BasketContext.Provider value={{
            order,
            basketItems,
            itemsCount,
            handleOrder,
            addItemToBasket,
            removeItemFromBasket,
            setCountAndTotalOfItem,
            clearBasket
        }}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasketData = _ => useContext(BasketContext);
