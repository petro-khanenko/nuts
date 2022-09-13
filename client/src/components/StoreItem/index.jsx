import React from 'react'
import {NavLink, useLocation} from "react-router-dom";
import {setToStorage} from "../../helpers/helpers";
import {localStorageKeys} from "../../constants/constants";

const StoreItem = ({item, idx, children}) => {
    const {pathname} = useLocation();
    const handleSetPath = () => {
        setToStorage(localStorageKeys.PREV_PATH, pathname);
    }
    return (
        <div className={'store_item'}>
            <div>{idx + 1}</div>
            <div className="store_item__image">
                <NavLink to={`/about/${item.anchorr}`} onClick={handleSetPath}>
                    <img src={item.image} alt="image"/>
                </NavLink>
            </div>
            <div className={'store_item__name'}>
                <NavLink to={`/about/${item.anchorr}`} onClick={handleSetPath}>
                    {item.name}
                </NavLink>
            </div>
            <div>{Number(item.price).toFixed(2)} грн / {item.points}</div>
            {children}
        </div>
    );
}

export default StoreItem;
