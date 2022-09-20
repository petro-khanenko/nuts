import React, {useState} from "react";
import {Button} from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {BasketItem} from "../basket/BasketItem";
import {useBasketData} from "../../context/BasketContext";
import {NavLink, useHistory} from "react-router-dom";
import {Modal} from "../../components/modals/Modal";
import {AdminBasketStoreItem} from "./AdminBasketStoreItem";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import {adminViews, localStorageKeys, mainRoutes, orderSteps, subRoutes} from "../../constants/constants";
import {useItemsData} from "../../context/ItemsContext";
import UpdateOrderDataProvider from "./UpdateOrderDataProvider";
import Checkout from "../../components/forms/Checkout";
import {setToStorage} from "../../helpers/helpers";
import {isEmpty} from "lodash";
import {useOrderData} from "../../context/OrderContext";


export const AdminBasket = () => {

    const {push} = useHistory();
    const {items: allItems} = useItemsData();
    const {order, basketItems, clearBasket} = useBasketData();
    const {onSetStep} = useOrderData();
    const [openStore, setOpenStore] = useState(false);
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);

    const items = Object.values(basketItems) || [];
    const total = items.reduce((result, item) => result + Number(item.total), 0).toFixed(2);
    const isPurchases = items.length;

    const handleCancel = () => {
        setOrderModalOpen(false);
        onSetStep(orderSteps.PERSONAL_INFO);
    }

    if (isEmpty(order)) {
        setToStorage(localStorageKeys.ADMIN_PANEL_VIEW, adminViews.ORDERS_LIST);
        push(`/${mainRoutes.ADMIN}/${subRoutes.PANEL}`);
    }

    return (
        <div>
            {
                isOrderModalOpen && (
                    <Modal onCancel={handleCancel}>
                        <UpdateOrderDataProvider>
                            <Checkout/>
                        </UpdateOrderDataProvider>
                    </Modal>
                )
            }
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
                            <BasketItem item={item}/>
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
                            allItems.map((item, idx) => <AdminBasketStoreItem item={item}
                                                                              idx={idx}
                            />)
                        }
                    </div>
                }
            </div>
        </div>
    );
}

