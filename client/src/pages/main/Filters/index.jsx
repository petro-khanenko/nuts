import React from "react";
import {sortModes} from "../../../constants/constants";
import FilterItem from "./FilterItem";

const Filters = () => {
    return (
        <div className="items__sort">
            {
                Object.values(sortModes).map((mode) => (
                    <FilterItem key={`sort-by-${mode.type}`} mode={mode}/>
                ))
            }
        </div>
    );
}

export default Filters;