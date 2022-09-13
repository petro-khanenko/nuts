import React from 'react';

const ItemRemastering = ({item, onUpdateItem, onDeleteItem, idx}) => {

    return (
        <div className={'remast'}>
            <div className={'remast__tittle'}>
                {idx + 1}. {item.name}
            </div>
            <div className={'remast__options'}>
                <button onClick={() => onUpdateItem(item)}>Update</button>
                <button onClick={() => onDeleteItem(item)}>Delete</button>
            </div>
        </div>
    );
}

export default ItemRemastering;
