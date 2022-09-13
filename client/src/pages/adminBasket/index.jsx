import React, {useState} from "react";
import {Button} from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {BasketItem} from "../basket/Basket/BasketItem";
import {useBasketData} from "../../context/BasketContext";
import {NavLink} from "react-router-dom";
import {OrderUpdateModal} from "../../components/modals/OrderUpdateModal";
import {AdminStoreItem} from "./AdminStoreItem";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import {mainRoutes, subRoutes} from "../../constants/constants";
import {useItemsData} from "../../context/ItemsContext";


export const AdminBasket = () => {

    const { items: allItems } = useItemsData();
    const {order, basketItems, clearBasket} = useBasketData();
    const [openStore, setOpenStore] = useState(false);
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);

    const items = Object.values(basketItems) || [];
    const total = items.reduce((result, item) => result + Number(item.total), 0).toFixed(2);
    const isPurchases = items.length;

    return (
        <div>
            {isOrderModalOpen && <OrderUpdateModal onCancel={() => setOrderModalOpen(false)}
                                                   items={items}
                                                   total={total}
                                                   order={order}
            />}
            <div className="basket">
                <div className='basket_go-back-button'>
                    <NavLink to={`/${mainRoutes.ADMIN}/${subRoutes.PANEL}`}>
                        <Button startIcon={<ArrowBackIos/>}
                                variant='contained'
                                size='large'
                                color='secondary'
                        >
                            Go Back
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
                    {!isPurchases ? <h2>Ваша корзина пока пуста</h2>
                        : items.map(item => <div>
                            <BasketItem item={item} /*someShit={someShit} setSomeShit={setSomeShit}*//>
                        </div>)
                    }
                    <div className='basket_total'>
                        <div/>
                        <div/>
                        <div>Total:</div>
                        <div>{total} грн</div>
                    </div>
                    <div className="basket_buttons">
                        <Button variant='contained'
                                color='primary'
                                startIcon={openStore ? <ExpandLess/> : <ExpandMore/>}
                                onClick={() => setOpenStore(!openStore)}>
                            {openStore ? 'Close' : 'Open'} Store
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => setOrderModalOpen(true)}>
                            Update Order
                        </Button>
                        <Button variant='contained' color='secondary' onClick={clearBasket}>Clear basket</Button>
                    </div>
                </div>
                {
                    openStore && <div className='admin_store'>
                        <div className='admin_store__header'>
                            <div>№</div>
                            <div>товар</div>
                            <div>ціна</div>
                        </div>
                        {
                            allItems.map((item, idx) => <AdminStoreItem item={item}
                                                                        idx={idx}
                            />)
                        }
                    </div>
                }
            </div>
        </div>
    );
}

