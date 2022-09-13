import React from 'react'
import {Button} from "@material-ui/core";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import {useBasketData} from "../../context/BasketContext";
import StoreItem from "../../components/StoreItem";

export const AdminBasketStoreItem = ({item, idx}) => {
    const {addItemToBasket} = useBasketData();

    return (
        <StoreItem
            item={item}
            idx={idx}
        >
            <Button variant='contained'
                    color='primary'
                    startIcon={<AddShoppingCart />}
                    onClick={() => addItemToBasket(item)}
            >
                Add to Basket
            </Button>
        </StoreItem>
    );
}
