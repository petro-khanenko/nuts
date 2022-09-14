import React from 'react'
import {Container, IconButton, makeStyles} from "@material-ui/core";
import {useHttp} from "../../../hooks/http.hook";
import {setInfoModal} from "../../../utils/swal/helpers";
import {apiRoutes, apiSubRoutes} from "../../../constants/constants";
import Checkout from "../../../pages/checkout";
import Cancel from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            // position: 'absolute',
            // right: '10px',
            minWidth: 40,
            marginTop: '10px',
            marginRight: '-15px',
            // float: 'right',
        },
        icon: {
            fontSize: 40,
            color: 'red',
        },
        root: {
            // position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 140px)',
            marginTop: '80px',
            marginBottom: '60px',
            backgroundColor: '#e1f1f1'
        }
    })
)

export const OrderUpdateModal = ({
                                     onCancel,
                                     items,
                                     total,
                                     order
                                 }) => {

    const {request} = useHttp();
    const {root, icon, iconButton} = useStyles();

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
            <Container className={root} container={'main'} maxWidth={'sm'}>
                <div className={'modal__header'}>
                    <div className={'modal__title'}>
                        Оформлення замовлення
                    </div>
                    <IconButton className={iconButton}
                                onClick={onCancel}>
                        <Cancel className={icon}/>
                    </IconButton>
                </div>
                <Checkout/>
            </Container>
            {/*<div className={'modal__window'}>*/}
            {/*    <div className={'modal__header'}>*/}
            {/*        <div className={'modal__title'}>*/}
            {/*            Оформлення замовлення*/}
            {/*            <IconButton className={iconButton}*/}
            {/*                        onClick={onCancel}>*/}
            {/*                <Close className={icon}/>*/}
            {/*            </IconButton>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={'modal__body'}>*/}
            {/*        <OrderFormFields onSubmit={onSubmit} order={order}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

