import React, {useEffect, useState} from 'react'
import ItemCard from "../ItemCard";
import {priceModes} from "../../../constants/constants";
import {useFiltersData} from "../../../context/FiltersContext";
import {useItemsData} from "../../../context/ItemsContext";

const ItemsList = () => {
    const { searchValue } = useFiltersData();
    const {items} = useItemsData();

    const handleSearchText = (value) => {
        if (value.trim().length === 0) {
            return items;
        }
        const searchText = value.toUpperCase();
        const filteredByName = items.filter(s => s.name.toUpperCase().includes(searchText));
        const filteredByDescription = items.filter(s => {
            if (s.description) {
                return s.description.toUpperCase().includes(searchText);
            }
        });
        return filteredByName.concat(filteredByDescription);
    };

    const renderItems = handleSearchText(searchValue);
    const [sortItems, setSortItems] = useState(renderItems)
    const [priceMode, setPriceMode] = useState('')
    const [nameMode, setNameMode] = useState('')

    useEffect(() => {
        setSortItems(items);
    }, [items.length, items[0]?.name]);

    const sortByPrice = (mode) => setSortItems(prev => {
        setPriceMode(mode);
        return [...prev].sort((a, b) => mode === priceModes.LOW ? +a.price - +b.price : +b.price - +a.price)
    });
    const sortByName = (mode) => setSortItems(prev => {
        setNameMode(mode);
        return [...prev].sort((a, b) => {
            if (mode === priceModes.ASC) {
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
            }
            return a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        });
    });

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
