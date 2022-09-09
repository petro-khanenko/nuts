import {createContext, useContext, useState} from 'react';

const SearchContext = createContext();

export const SearchContextProvider = ({children}) => {
    const [pageY, setPageY] = useState(0);

    return (
        <SearchContext.Provider value={{
            pageY,
            setPageY
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchData = _ => useContext(SearchContext);
