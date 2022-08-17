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
)

export const OrderUpdateModal = ({
                                     onCancel,
                                     items,
                                     total,
                                     order
                                 }) => {

    const {request} = useHttp();
    const {icon, iconButton} = useStyles();

    const updateOrderHandler = async (formData) => {
        try {
            const data = await request('/api/orders/update', 'POST', {
                ...formData,
                id: order._id,
                active: order.active,
                orderNum: order.orderNum,
                total,
                items
            });
            onCancel();
            if (data.status === 'success') {
                await swalWithCustom.fire({
                    text: 'Замовлення оновлено!',
                    icon: 'success'
                });
            }
        } catch (e) {
            swalWithCustom.fire({
                text: 'На жаль, під час оновлення замовлення сталася помилка. Повторіть, будь ласка, спробу!',
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
        updateOrderHandler(formData);
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
                    <OrderFormFields onSubmit={onSubmit} order={order}/>
                </div>
            </div>
        </div>
    );
}

