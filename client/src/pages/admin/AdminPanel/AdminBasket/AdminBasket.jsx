import {Button} from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import React, {useEffect, useState} from "react";
import {BasketItem} from "../../../basket/Basket/BasketItem/BasketItem";
import {useAdminBasketData} from "../../../../context/AdminBasketContext";
import {NavLink} from "react-router-dom";
import {OrderUpdateModal} from "../../../../components/modals/OrderUpdateModal/OrderUpdateModal";
import {AdminStoreItem} from "./AdminStoreItem/AdminStoreItem";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";


export const AdminBasket = ({someShit, setSomeShit, companies}) => {

    const [isOrderModalOpen, setOrderModalOpen] = useState(false);

    const {order: adminBasketOrder, orderHandler} = useAdminBasketData();
    const [order, setOrder] = useState(adminBasketOrder || {});
    const [openStore, setOpenStore] = useState(false);

    const setItemsToAdminBasket = (items = []) => {
        const itemsObj = items.reduce((result, item) => ({...result, [item.name]: item}), {});
        localStorage.setItem('basket', JSON.stringify(itemsObj));
        localStorage.setItem('items', Object.keys(itemsObj).length);
        setSomeShit(!someShit);
    };
    useEffect(() => {
        setItemsToAdminBasket(order?.items);
    }, [order])

    const getItems = () => {
        const items = localStorage.getItem('basket')
        const parsedItems = items ? JSON.parse(items) : {}
        return Object.values(parsedItems)
    };
    const clearBasket = () => {
        localStorage.removeItem('basket')
        localStorage.removeItem('items')
        setSomeShit(!someShit)
    };
    const items = getItems();

    // --- without local storage ---
    // const clearBasket = () => {
    //     orderHandler({...order, items: []});
    // };
    // const items = order?.items || [];

    const total = items.reduce((result, item) => result + Number(item.total), 0).toFixed(2);
    const isPurchases = items.length;

    return (
        <div>
            {isOrderModalOpen && <OrderUpdateModal  onCancel={() => setOrderModalOpen(false)}
                                                    items={items}
                                                    clearBasket={clearBasket}
                                                    total={total}
                                                    order={order}
            />}
            <div className="basket">
                <div className='basket_go-back-button'>
                    <NavLink to='/admin/panel'>
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
                            <BasketItem item={item} someShit={someShit} setSomeShit={setSomeShit}/>
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
                                startIcon={openStore ? <ExpandLess/> : <ExpandMore />}
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
                            companies.map((company, idx) => <AdminStoreItem item={company}
                                                                            idx={idx}
                                                                            someShit={someShit}
                                                                            setSomeShit={setSomeShit}
                            />)
                        }
                    </div>
                }
            </div>
        </div>
    );
}

