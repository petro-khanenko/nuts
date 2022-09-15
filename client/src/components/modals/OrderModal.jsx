import React from 'react'
import {IconButton, makeStyles} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {OrderFormFields} from "../OrderFormFields";
import {useHttp} from "../../hooks/http.hook";
import {setInfoModal} from "../../utils/swal/helpers";
import {apiRoutes, apiSubRoutes} from "../../constants/constants";

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

