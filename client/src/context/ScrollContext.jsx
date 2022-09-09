import {createContext, useContext, useState} from 'react';

const ScrollContext = createContext();

export const ScrollContextProvider = ({children}) => {
    const [pageY, setPageY] = useState(0);

    return (
        <ScrollContext.Provider value={{
            pageY,
            setPageY
        }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScrollData = _ => useContext(ScrollContext);
