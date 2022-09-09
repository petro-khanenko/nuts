import React from "react";
import {useFiltersData} from "../../../context/FiltersContext";

const FilterItem = ({mode}) => {
    const {sortMode, onSetSortMode} = useFiltersData();
    return (
        <div className={sortMode && sortMode === mode.type && 'items__sort_active'}
             onClick={() => onSetSortMode(mode.type)}
        >
            {mode.title}
        </div>
    );
}

export default FilterItem;