import React, {useEffect, useState} from 'react';
import {useHttp} from "../../../hooks/http.hook";
import {useFiltersData} from "../../../context/FiltersContext";
import {useItemsData} from "../../../context/ItemsContext";
import {sortModes} from "../../../constants/constants";
import ItemCard from "../ItemCard";


const ItemsList = () => {
    const {items} = useItemsData();
    const {searchValue} = useFiltersData();
    const {sortMode} = useFiltersData();
    const {loading} = useHttp();

    const [filteredItems, setFilteredItems] = useState(items);

    const setItemsBySearchText = (value) => {
        if (!value.trim()) {
            return [...items];
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

    const setItemsBySortMode = (items) => {
        switch (sortMode) {
            case sortModes.LOW.type:
                return items.sort((a, b) => Number(a.price) - Number(b.price));
            case sortModes.HIGH.type:
                return items.sort((a, b) => Number(b.price) - Number(a.price))
            case sortModes.ASC.type:
                return items.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            case sortModes.DESC.type:
                return items.sort((a, b) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0);
            default:
                return items;
        }
    }

    useEffect(() => {
        setFilteredItems(setItemsBySortMode(setItemsBySearchText(searchValue)));
    }, [searchValue, sortMode, items]);

    if (loading) return <h2>Loading...</h2>

    return (
        <div className={filteredItems.length < 3 ? 'items-list-less-then-3' : 'items-list'}>
            {filteredItems.map(item => <ItemCard key={item.id}
                                                 item={item}
            />)}
        </div>
    );
}

export default ItemsList;
