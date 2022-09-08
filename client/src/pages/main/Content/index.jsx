import React from 'react'
import Header from "../../../components/Header";
import ItemsList from "../ItemsList";

const Content = ({searchText, items, pageY, handleGoToBasket, someShit, setSomeShit}) => {

    return (
        <div>
            <Header searchText={searchText}/>
            <div className={'content'}>
                <ItemsList items={items}
                           pageY={pageY}
                           handleGoToBasket={handleGoToBasket}
                           someShit={someShit}
                           setSomeShit={setSomeShit}
                />
            </div>
        </div>
    )
}

export default Content
