import React from 'react'

const StoreItem = ({item, idx, children}) => {
    return (
        <div className={'store_item'}>
            <div>{idx + 1}</div>
            <div className="store_item__image">
                <img src={item.image} alt="image"/>
            </div>
            <div className={'store_item__name'}>{item.name}</div>
            <div>{Number(item.price).toFixed(2)} грн / {item.points}</div>
            {children}
        </div>
    );
}

export default StoreItem;
