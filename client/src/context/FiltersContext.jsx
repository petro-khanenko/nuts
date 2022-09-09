import {createContext, useContext, useState} from 'react';

const FiltersContext = createContext();

export const FiltersContextProvider = ({children}) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <FiltersContext.Provider value={{
            searchValue,
            onSetSearchValue: setSearchValue
        }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFiltersData = _ => useContext(FiltersContext);
