import React from 'react'
import {adminViews} from "../../../constants/constants";

export const AdminViewsSwitcher = ({switchMode, onSwitchView}) => {

    return (
        <div>
            <button onClick={() => onSwitchView(adminViews.ADD_NEW_ITEM)}
                    disabled={switchMode === adminViews.ADD_NEW_ITEM}
            >
                Add New Item
            </button>
            <button onClick={() => onSwitchView(adminViews.ITEMS_LIST)}
                    disabled={switchMode === adminViews.ITEMS_LIST}
            >
                Items List
            </button>
            <button onClick={() => onSwitchView(adminViews.ORDERS_LIST)}
                    disabled={switchMode === adminViews.ORDERS_LIST}
            >
                Orders
            </button>
        </div>
    );
}
