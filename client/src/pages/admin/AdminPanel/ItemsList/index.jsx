import React from 'react';
import ItemRemastering from "./ItemRemastering";

const ItemsList = ({items, onUpdateItem, onDeleteItem}) => {
    return (
        <div className={'admin-panel'}>
            <h2>Delete or Update Item</h2>
            <div>
                {items.map((item, idx) => <ItemRemastering item={item}
                                                           idx={idx}
                                                           onUpdateItem={onUpdateItem}
                                                           onDeleteItem={onDeleteItem}
                />)}
            </div>
        </div>
    );
}

export default ItemsList;
