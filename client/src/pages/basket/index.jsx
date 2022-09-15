import {BasketItem} from "./BasketItem";
import {Button} from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {NavLink, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {OrderModal} from "../../components/modals/OrderModal";
import {setConfirmModal} from "../../utils/swal/helpers";
import {useBasketData} from "../../context/BasketContext";
import {mainRoutes, subRoutes} from "../../constants/constants";


const Basket = () => {
    const {push} = useHistory();
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
            {isOrderModalOpen && <OrderModal onCancel={() => setOrderModalOpen(false)}
                                             items={items}
                                             total={total}
            />}
            <div className="basket">
                <div className='basket_go-back-button'>
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
                <h2 className="basket_title">КОРЗИНА</h2>
                <div className='basket_header'>
                    <div>Товар</div>
                    <div>Ціна</div>
                    <div>Кількість</div>
                    <div>Всього</div>
                </div>
                <div className="basket_content">
                    {!isPurchases ? <h2>Ваша корзина поки пуста</h2>
                        : items.map(item => <div>
                            <BasketItem item={item}/>
                        </div>)
                    }
                    <div className='basket_total'>
                        <div/>
                        <div/>
                        <div>Всього:</div>
                        <div>{total} грн</div>
                    </div>
                    <div className="basket_buttons">
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => push(`/${mainRoutes.BASKET}/${subRoutes.CHECKOUT}`)}
                            // onClick={() => setOrderModalOpen(true)}
                        >
                            Оформити замовлення
                        </Button>
                        <Button variant='contained' color='secondary' onClick={clearBasketHandler}>Очистити корзину</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Basket;
