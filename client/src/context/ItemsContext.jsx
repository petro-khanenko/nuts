import {createContext, useContext, useState} from 'react';

const ItemsContext = createContext();

export const ItemsContextProvider = ({children}) => {
    const [items, setItems] = useState([]);

    const getItem = (anchor) => {
        return items.find(item => item.anchorr && item.anchorr === anchor);
    };


    return (
        <ItemsContext.Provider value={{
            items,
            onSetItems: setItems,
            onGetItem: getItem
        }}>
            {children}
        </ItemsContext.Provider>
    );
};

export const useItemsData = _ => useContext(ItemsContext);
