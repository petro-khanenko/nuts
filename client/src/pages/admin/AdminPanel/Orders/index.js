import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from "../../../../hooks/http.hook";
import {OrderItem} from "./OrderItem";
import {apiRoutes, localStorageKeys, ordersViews} from "../../../../constants/constants";
import {useBasketData} from "../../../../context/BasketContext";
import {IconButton, makeStyles} from "@material-ui/core";
import FiberNew from "@material-ui/icons/FiberNew";
import DoneAll from "@material-ui/icons/DoneAll";
import {getFromStorage, setToStorage} from "../../../../helpers/helpers";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            minWidth: 35,
            justifySelf: 'center'
        },
        iconActive: {
            fontSize: 40,
            color: 'green',
        },
        iconCompleted: {
            fontSize: 40,
            color: 'blue',
        },
    })
)

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [viewMode, setViewMode] = useState(getFromStorage(localStorageKeys.ORDERS_VIEW) || ordersViews.ACTIVE_ORDERS);

    const {handleOrder} = useBasketData();
    const {request} = useHttp();
    const {iconButton, iconActive, iconCompleted} = useStyles();

    const fetchOrders = useCallback(async () => {
        const data = await request(`/${apiRoutes.ORDERS}`);
        setOrders(data);
    }, [request]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const getItemsAndGoToBasket = (id) => {
        const order = orders.find(order => order._id === id);
        handleOrder(order);
    }

    const handleSwitchView = (view) => {
        setViewMode(view);
        setToStorage(localStorageKeys.ORDERS_VIEW, view);
    }

    // render orders
    const getRenderOrders = () => {
        switch (viewMode) {
            case ordersViews.ACTIVE_ORDERS:
                return orders.filter(order => order.active);
            case ordersViews.COMPLETED_ORDERS:
                return orders.filter(order => !order.active);
        }
    }
    const renderOrders = getRenderOrders().reverse();

    return (
        <div className={'orders'}>
            <h2 className="basket_title">Orders</h2>
            <div className='orders_header'>
                <div className='orders_header__number'>№</div>
                <div>Замовник</div>
                <div>Адреса доставки</div>
                <div>Всього</div>
                <IconButton className={iconButton}
                            onClick={() => handleSwitchView(ordersViews.ACTIVE_ORDERS)}
                >
                    <FiberNew className={iconActive}/>
                </IconButton>
                <IconButton className={iconButton}
                            onClick={() => handleSwitchView(ordersViews.COMPLETED_ORDERS)}
                >
                    <DoneAll className={iconCompleted}/>
                </IconButton>
            </div>
            <div>
                {!renderOrders.length ? <h2>На жаль, замовлень поки немає :(</h2>
                    : renderOrders.map(order => <OrderItem order={order}
                                                   fetchOrders={fetchOrders}
                                                   getItemsAndGoToBasket={getItemsAndGoToBasket}
                    />)
                }
            </div>
        </div>
    );
}
