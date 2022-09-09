import React, {useEffect, useState} from 'react'
import ItemCard from "../ItemCard";
import {priceModes} from "../../../constants/constants";
import {useScrollData} from "../../../context/ScrollContext";

const ItemsList = ({ items }) => {
    const {pageY} = useScrollData();

    const [sortItems, setSortItems] = useState(items)
    const [priceMode, setPriceMode] = useState('')
    const [nameMode, setNameMode] = useState('')

    useEffect(() => {
        setSortItems(items);
    }, [items.length, items[0]?.name]);

    useEffect(() => {
        window.scrollTo(0, pageY);
    }, [pageY]);

    const sortByPrice = (mode) => setSortItems(prev => {
        setPriceMode(mode)
        return [...prev].sort((a, b) => mode === priceModes.LOW ? +a.price - +b.price : +b.price - +a.price)
    })
    const sortByName = (mode) => setSortItems(prev => {
        setNameMode(mode)
        return [...prev].sort((a, b) => {
            if (mode === priceModes.ASC) {
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
            }
            return a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        })
    })

    return (
        <>
            <div className="companies__sort">
                <div className={priceMode === priceModes.LOW && 'companies__sort_active'}
                      onClick={() => sortByPrice(priceModes.LOW)}
                >
                    Спочатку дешевші
                </div>
                <div className={priceMode === priceModes.HIGH && 'companies__sort_active'}
                    onClick={() => sortByPrice(priceModes.HIGH)}
                >
                    Спочатку дорожчі
                </div>
                <div className={nameMode === priceModes.ASC && 'companies__sort_active'}
                    onClick={() => sortByName(priceModes.ASC)}
                >
                    Сортувати від А...
                </div>
                <div className={nameMode === priceModes.DESC && 'companies__sort_active'}
                    onClick={() => sortByName(priceModes.DESC)}
                >
                    Сортувати від Я...
                </div>
                <div onClick={() => {
                    setSortItems(items)
                    setNameMode('')
                    setPriceMode('')
                }}>
                    Скинути фільтри
                </div>
            </div>
            <div className={sortItems.length < 3 ? 'companies-list-less-then-3' : 'companies-list'}>
                {sortItems.map(item => <ItemCard key={item.id}
                                                 item={item}
                />)}
            </div>
        </>
    );
}

export default ItemsList;
