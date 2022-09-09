import {createContext, useContext, useState} from 'react';

const FiltersContext = createContext();

export const FiltersContextProvider = ({children}) => {
    const [searchValue, setSearchValue] = useState('');
    const [sortMode, setSortMode] = useState('');

    return (
        <FiltersContext.Provider value={{
            searchValue,
            sortMode,
            onSetSearchValue: setSearchValue,
            onSetSortMode: setSortMode
        }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFiltersData = _ => useContext(FiltersContext);
