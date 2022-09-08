import React from 'react'
import {Button} from "@material-ui/core";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import {useBasketData} from "../../../../../context/BasketContext";

export const AdminStoreItem = ({item, idx}) => {
    const {addItemToBasket} = useBasketData();

    return (
        <div className={'store_item'}>
            <div>{idx + 1}</div>
            <div className="store_item__image">
                <img src={item.image} alt="image"/>
            </div>
            <div className={'store_item__name'}>{item.name}</div>
            <div>{Number(item.price).toFixed(2)} грн / {item.points}</div>
            <Button variant='contained'
                    color='primary'
                    startIcon={<AddShoppingCart />}
                    onClick={() => addItemToBasket(item)}
            >
                Add to Basket
            </Button>
        </div>
    );
}
