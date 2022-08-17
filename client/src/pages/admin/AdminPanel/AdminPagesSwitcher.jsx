import React from 'react'
import {adminPages} from "../../../constants/constants";

export const AdminPagesSwitcher = ({switchMode, setSwitchMode}) => {

    return (
        <div>
            <button onClick={() => setSwitchMode(adminPages.ADD_NEW_ITEM)}
                    disabled={switchMode === adminPages.ADD_NEW_ITEM}
            >Add New Item
            </button>
            <button onClick={() => setSwitchMode(adminPages.ITEMS_LIST)}
                    disabled={switchMode === adminPages.ITEMS_LIST}
            >Items List
            </button>
            <button onClick={() => setSwitchMode(adminPages.ORDERS_LIST)}
                    disabled={switchMode === adminPages.ORDERS_LIST}
            >Orders
            </button>
        </div>
    );
}
