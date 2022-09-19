import React from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useBasketData} from "../../context/BasketContext";
import {apiRoutes, apiSubRoutes} from "../../constants/constants";
import {setInfoModal} from "../../utils/swal/helpers";

const UpdateOrderDataProvider = ({onCancel, children}) => {
    const {request} = useHttp();
    const {order, basketItems} = useBasketData();

    const items = Object.values(basketItems) || [];
    const total = items.reduce((result, item) => result + Number(item.total), 0).toFixed(2);

    const updateOrderHandler = async (formData) => {
        try {
            const data = await request(`/${apiRoutes.ORDERS}/${apiSubRoutes.UPDATE}`, 'PUT', {
                ...formData,
                id: order._id,
                active: order.active,
                orderNum: order.orderNum,
                total,
                items
            });
            onCancel();
            if (data.status === 'success') {
                setInfoModal('Замовлення оновлено!');
            }
        } catch (e) {
            setInfoModal(
                'На жаль, під час оновлення замовлення сталася помилка. Повторіть, будь ласка, спробу!',
                'warning'
            );
        }
    };

    const onSubmit = (formData) => {
        if (!items.length) {
            setInfoModal(
                'На жаль, Ваша корзина пуста. Додайте спочатку товари, перш, ніж зробити замовлення!',
                'warning'
            );
            return;
        }
        updateOrderHandler(formData);
    };
    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        order,
                        onSubmit
                    });
                }
                return null;
            })}
        </>
    );
}

export default UpdateOrderDataProvider;