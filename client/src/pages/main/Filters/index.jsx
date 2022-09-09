import React from "react";
import {sortModes} from "../../../constants/constants";
import {useFiltersData} from "../../../context/FiltersContext";

const Filters = () => {
    const { sortMode, onSetSortMode } = useFiltersData();

    return (
        <div className="items__sort">
            <div className={sortMode === sortModes.LOW && 'items__sort_active'}
                 onClick={() => onSetSortMode(sortModes.LOW)}
            >
                Спочатку дешевші
            </div>
            <div className={sortMode === sortModes.HIGH && 'items__sort_active'}
                 onClick={() => onSetSortMode(sortModes.HIGH)}
            >
                Спочатку дорожчі
            </div>
            <div className={sortMode === sortModes.ASC && 'items__sort_active'}
                 onClick={() => onSetSortMode(sortModes.ASC)}
            >
                Сортувати від А...
            </div>
            <div className={sortMode === sortModes.DESC && 'items__sort_active'}
                 onClick={() => onSetSortMode(sortModes.DESC)}
            >
                Сортувати від Я...
            </div>
            <div onClick={() => onSetSortMode('')}>
                Скинути фільтри
            </div>
        </div>
    );
}

export default Filters;