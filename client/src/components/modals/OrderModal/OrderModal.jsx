import React from 'react'
import {IconButton, makeStyles} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {OrderFormFields} from "../../OrderFormFields/OrderFormFields";
import {useHttp} from "../../../hooks/http.hook";
import {swalWithCustom} from "../../../utils/swal/swalWithCustom";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            minWidth: 30,
            marginTop: '-13px',
            float: 'right',
        },
        icon: {
            fontSize: 30,
            color: 'red',
        },
    })
);

const INIT_ORDER_NUMBER = '0833';

export const OrderModal = ({
                               onCancel,
                               items,
                               clearBasket,
                               total
                           }) => {

    const {request} = useHttp();
    const {icon, iconButton} = useStyles();

    const saveOrderHandler = async (formData) => {
        try {
            let counts = await request('/api/count');
            if (!counts.length) {
                await request('/api/count/save', 'POST', {
                    orderNum: INIT_ORDER_NUMBER
                });
                counts = await request('/api/count');
            }
            const count = counts[0];
            const nextOrderNum = String(Number(count.orderNum) + 1);
            await request('/api/count/update', 'POST', {
                orderNum: nextOrderNum.length === 3 ? '0' + nextOrderNum : nextOrderNum,
                id: count._id
            });
            const data = await request('/api/orders/save', 'POST', {
                ...formData,
                active: true,
                orderNum: count.orderNum,
                total,
                items
            });
            onCancel();
            clearBasket();
            if (data.status === 'success') {
                await swalWithCustom.fire({
                    text: 'Вітаємо, Ваше замовлення прийнято. Ми з Вами зв\'яжемось найближчим часом!!!',
                    icon: 'success'
                });
            }
        } catch (e) {
            swalWithCustom.fire({
                text: 'На жаль, під час обробки замовлення сталася помилка. Повторіть, будь ласка, відправку форми!',
                icon: 'warning'
            });
        }
    };

    const onSubmit = (formData) => {
        if (!items.length) {
            swalWithCustom.fire({
                text: 'На жаль, Ваша корзина пуста. Додайте спочатку товари, перш, ніж зробити замовлення!',
                icon: 'warning'
            });
            return;
        }
        saveOrderHandler(formData);
    };

    return (
        <div className={'modal__overlay'}>
            <div className={'modal__window'}>
                <div className={'modal__header'}>
                    <div className={'modal__title'}>
                        Оформлення замовлення
                        <IconButton className={iconButton}
                                    onClick={onCancel}>
                            <Close className={icon}/>
                        </IconButton>
                    </div>
                </div>
                <div className={'modal__body'}>
                    <OrderFormFields onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    );
}

