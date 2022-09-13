import React from 'react';
import ListItem from "./ListItem";

const ItemsList = ({items, onUpdateItem, fetchItems}) => {
    return (
        <>
            <h2>Delete or Update Item</h2>
            <div className='admin_store'>
                <div className='admin_store__header'>
                    <div>№</div>
                    <div>товар</div>
                    <div>ціна</div>
                </div>
                <div>
                    {items.map((item, idx) => <ListItem item={item}
                                                        idx={idx}
                                                        onUpdateItem={onUpdateItem}
                                                        fetchItems={fetchItems}
                    />)}
                </div>
            </div>
        </>
    );
}

export default ItemsList;
