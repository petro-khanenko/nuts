import React from 'react'
import {IconButton, makeStyles} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {OrderFormFields} from "../../OrderFormFields";
import {useHttp} from "../../../hooks/http.hook";
import {setInfoModal} from "../../../utils/swal/helpers";
import {apiRoutes, apiSubRoutes} from "../../../constants/constants";

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

