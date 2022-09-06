import React from 'react'
import {IconButton, makeStyles} from "@material-ui/core";
import Rowing from "@material-ui/icons/Rowing";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import {useHttp} from "../../../hooks/http.hook";
import {NavLink} from "react-router-dom";
import {setConfirmModal, setInfoModal} from "../../../utils/swal/helpers";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            minWidth: 35,
            justifySelf: 'center'
        },
        iconDecrease: {
            fontSize: 40,
            color: 'red',
        },
        iconIncrease: {
            fontSize: 40,
            color: 'green',
        },
    })
)

export const OrderItem = ({order, fetchOrders, getItemsAndGoToBasket}) => {

    const {iconDecrease, iconIncrease, iconButton} = useStyles();
    const {request} = useHttp();
    const isActive = order?.active;

    const deleteOrderRequest = async () => {
        try {
            const data = await request('/api/orders/delete', 'DELETE', {id: order._id});
            if (data.status === 'success') {
                fetchOrders();
            }
        } catch (e) {
            setInfoModal(
                'На жаль, під час видалення замовлення сталася помилка. Повторіть, будь ласка, спробу!',
                'warning'
            );
        }
    };
    const deleteOrderHandler = () => {
        setConfirmModal(
            'Ви впевнені, що бажаєте видалити дане замовлення?',
            'Замовлення успішно видалено!',
            deleteOrderRequest
        );
    };

    const completedOrderRequest = async () => {
        try {
            const data = await request('/api/orders/update', 'POST', {
                ...order,
                id: order._id,
                active: !order.active
            });
            if (data.status === 'success') {
                fetchOrders();
            }
        } catch (e) {
            setInfoModal(
                'На жаль, під час обробки запиту сталася помилка. Повторіть, будь ласка, спробу!',
                'warning'
            );
        }
    };
    const completedOrderHandler = () => {
        const confirmText = isActive
            ? 'Ви впевнені, що бажаєте помітити дане замовлення, як виконане?'
            : 'Ви впевнені, що бажаєте повернути дане замовлення до активних?';

        const infoText = isActive
            ? 'Замовлення успішно переведене у виконані!'
            : 'Замовлення успішно переведене до активних!';

        setConfirmModal(
            confirmText,
            infoText,
            completedOrderRequest
        );
    };

    return (
        <div className={'order_item'}>
            <div className='order_item__number'>{order.orderNum}</div>
            <NavLink className='order_item__link' to='/admin/panel/admin_basket'>
                <div className='order_item__client' onClick={() => getItemsAndGoToBasket(order._id)}>
                    <div>{order.firstName} {order.lastName}</div>
                    <div>{order.email}</div>
                    <div>{order.phone}</div>
                </div>
            </NavLink>
            <div>{order.address}</div>
            <div>{Number(order.total).toFixed(2)} грн</div>
            <IconButton className={iconButton} onClick={completedOrderHandler}>
                {isActive ? <CheckCircle className={iconIncrease}/> : <Rowing className={iconIncrease}/>}
            </IconButton>
            <IconButton className={iconButton} onClick={deleteOrderHandler}>
                <Cancel className={iconDecrease}/>
            </IconButton>
        </div>
    );
}
