import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {BasketItem} from "./BasketItem";
import {setConfirmModal} from "../../utils/swal/helpers";
import {useBasketData} from "../../context/BasketContext";
import {Modal} from "../../components/modals/Modal";
import OrderDataProvider from "./OrderDataProvider";
import Checkout from "../../components/forms/Checkout";


const Basket = () => {
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);
    const {basketItems, clearBasket} = useBasketData();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const clearBasketHandler = () => {
        setConfirmModal(
            'Ви впевнені, що бажаєте очистити корзину?',
            'Корзина успішно очищена!',
            clearBasket
        );
    };

    const items = Object.values(basketItems);
    const total = items.reduce((result, item) => result + Number(item.total), 0).toFixed(2);

    const isPurchases = items.length;
    return (
        <div>
            {
                isOrderModalOpen && (
                    <Modal onCancel={() => setOrderModalOpen(false)}>
                        <OrderDataProvider>
                            <Checkout/>
                        </OrderDataProvider>
                    </Modal>
                )
            }
            <div className="basket">
                <div className='basket__go-back-button'>
                    <NavLink to={'/'}>
                        <Button startIcon={<ArrowBackIos/>}
                                variant='contained'
                                size='large'
                                color='secondary'
                        >
                            До списку товарів
                        </Button>
                    </NavLink>
                </div>
                <h2 className="basket__title">КОРЗИНА</h2>
                <div className='basket__header'>
                    <div>Товар</div>
                    <div>Ціна</div>
                    <div>Кількість</div>
                    <div>Всього</div>
                </div>
                <div className="basket__content">
                    {!isPurchases ? <h2>Ваша корзина поки пуста</h2>
                        : items.map(item => <div>
                            <BasketItem item={item}/>
                        </div>)
                    }
                    <div className='basket__total'>
                        <div/>
                        <div/>
                        <div>Всього:</div>
                        <div>{total} грн</div>
                    </div>
                    <div className="basket__buttons">
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => setOrderModalOpen(true)}
                        >
                            Оформити замовлення
                        </Button>
                        <Button variant='contained' color='secondary' onClick={clearBasketHandler}>
                            Очистити корзину
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Basket;
