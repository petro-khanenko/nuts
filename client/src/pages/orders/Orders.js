import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {OrderItem} from "./OrderItem/OrderItem";
import {orderPages} from "../../constants/constants";
import {useAdminBasketData} from "../../context/AdminBasketContext";
import {IconButton, makeStyles} from "@material-ui/core";
import FiberNew from "@material-ui/icons/FiberNew";
import DoneAll from "@material-ui/icons/DoneAll";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            minWidth: 35,
            float: 'right',
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

let fetchedOrders = [];

export const Orders = () => {

    const [orders, setOrders] = useState(fetchedOrders);
    const [pageMode, setPageMode] = useState(orderPages.ACTIVE_ORDERS);

    const {orderHandler} = useAdminBasketData();
    const {request} = useHttp();
    const {iconButton, iconActive, iconCompleted} = useStyles();

    const fetchOrders = useCallback(async () => {
        const data = await request('/api/orders');
        fetchedOrders = data;
        setOrders(data);
    }, [request]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const getItemsAndGoToBasket = (id) => {
        const order = orders.find(order => order._id === id);
        orderHandler(order);
    };
    // render orders
    const getRenderOrders = () => {
        switch (pageMode) {
            case orderPages.ACTIVE_ORDERS:
                return orders.filter(order => order.active);
            case orderPages.COMPLETED_ORDERS:
                return orders.filter(order => !order.active);
        }
    }
    const renderOrders = getRenderOrders().reverse();

    return (
        <div className={'orders'}>
            <h2 className="basket_title">Orders</h2>
            <div className='orders_header'>
                <div>№</div>
                <div>замовник</div>
                <div>адреса доставки</div>
                <div>всього</div>
                <IconButton className={iconButton}
                            onClick={() => setPageMode(orderPages.ACTIVE_ORDERS)}
                >
                    <FiberNew className={iconActive}/>
                </IconButton>
                <IconButton className={iconButton}
                            onClick={() => setPageMode(orderPages.COMPLETED_ORDERS)}
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
