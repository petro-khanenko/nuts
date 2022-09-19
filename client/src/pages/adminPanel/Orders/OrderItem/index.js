import React from 'react';
import {NavLink} from "react-router-dom";
import {IconButton, makeStyles} from "@material-ui/core";
import Rowing from "@material-ui/icons/Rowing";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import {useHttp} from "../../../../hooks/http.hook";
import {setConfirmModal, setInfoModal, setSuccessModal} from "../../../../utils/swal/helpers";
import {apiRoutes, apiSubRoutes, deliveryOptions, mainRoutes, subRoutes} from "../../../../constants/constants";

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
            const data = await request(`/${apiRoutes.ORDERS}/${apiSubRoutes.DELETE}`, 'DELETE', {id: order._id});
            if (data.status === 'success') {
                setSuccessModal('Замовлення успішно видалено!');
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
            null,
            deleteOrderRequest
        );
    };

    const completedOrderRequest = async () => {
        try {
            const data = await request(`/${apiRoutes.ORDERS}/${apiSubRoutes.UPDATE}`, 'POST', {
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

    const renderAddress = (method) => {
        switch (method) {
            case deliveryOptions.SELF.value:
                return deliveryOptions.SELF.label;
            case deliveryOptions.NP.value:
                return `${order.address.npWarehouse}, ${order.address.npCity}`;
            case deliveryOptions.OTHER.value:
                return deliveryOptions.OTHER.label;
        }
    }

    return (
        <div className={'order_item'}>
            <div className='order_item__number'>{order.orderNum}</div>
            <NavLink className='order_item__link' to={`/${mainRoutes.ADMIN}/${subRoutes.PANEL}/${subRoutes.ADMIN_BASKET}`}>
                <div className='order_item__client' onClick={() => getItemsAndGoToBasket(order._id)}>
                    <div>{order.firstName} {order.lastName}</div>
                    <div>{order.email}</div>
                    <div>{order.phone}</div>
                </div>
            </NavLink>
            <div className='order_item__address'>{renderAddress(order.address.method)}</div>
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
