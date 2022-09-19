import React from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useBasketData} from "../../context/BasketContext";
import {apiRoutes, apiSubRoutes, INIT_ORDER_NUMBER} from "../../constants/constants";
import {setInfoModal} from "../../utils/swal/helpers";

const OrderDataProvider = ({onCancel, children}) => {
    const {request} = useHttp();
    const {basketItems, clearBasket} = useBasketData();

    const items = Object.values(basketItems) || [];
    const total = items.reduce((result, item) => result + Number(item.total), 0).toFixed(2);

    const saveOrderHandler = async (formData) => {
        try {
            let counts = await request(`/${apiRoutes.COUNT}`);
            if (!counts.length) {
                await request(`/${apiRoutes.COUNT}/${apiSubRoutes.SAVE}`, 'POST', {
                    orderNum: INIT_ORDER_NUMBER
                });
                counts = await request(`/${apiRoutes.COUNT}`);
            }
            const count = counts[0];
            const nextOrderNum = String(Number(count.orderNum) + 1);
            await request(`/${apiRoutes.COUNT}/${apiSubRoutes.UPDATE}`, 'PUT', {
                orderNum: nextOrderNum.length === 3 ? '0' + nextOrderNum : nextOrderNum,
                id: count._id
            });
            const data = await request(`/${apiRoutes.ORDERS}/${apiSubRoutes.SAVE}`, 'POST', {
                ...formData,
                active: true,
                orderNum: count.orderNum,
                total,
                items
            });
            if (data.status === 'success') {
                onCancel();
                clearBasket();
                setInfoModal('Вітаємо, Ваше замовлення прийнято. Ми з Вами зв\'яжемось найближчим часом!!!');
            }
        } catch (e) {
            setInfoModal(
                'На жаль, під час обробки замовлення сталася помилка. Повторіть, будь ласка, відправку форми!',
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
        saveOrderHandler(formData);
    };

    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        onSubmit
                    });
                }
                return null;
            })}
        </>
    );
}

export default OrderDataProvider;