import React, {useState} from 'react';
import {getFromStorage, setToStorage} from "../../helpers/helpers";
import {adminViews, localStorageKeys} from "../../constants/constants";
import {Orders} from "./Orders";
import AddItem from "./AddItem";
import AdminPanelContainer from "../../components/AdminPanelContainer";
import ItemsList from "./ItemsList";
import {AdminViewsSwitcher} from "./AdminViewsSwitcher";


const AdminPanel = () => {
    const [switchMode, setSwitchMode] = useState(
        getFromStorage(localStorageKeys.ADMIN_PANEL_VIEW)
        || adminViews.ORDERS_LIST
    );
    const handleSwitchView = (view) => {
        setSwitchMode(view);
        setToStorage(localStorageKeys.ADMIN_PANEL_VIEW, view);
    }

    return (
        <AdminPanelContainer>
            <AdminViewsSwitcher
                switchMode={switchMode}
                onSwitchView={handleSwitchView}
            />
            {
                switchMode === adminViews.ADD_NEW_ITEM && <AddItem/>
            }
            {
                switchMode === adminViews.ITEMS_LIST && <ItemsList/>
            }
            {
                switchMode === adminViews.ORDERS_LIST && <Orders/>
            }
        </AdminPanelContainer>
    );
}

export default AdminPanel;
