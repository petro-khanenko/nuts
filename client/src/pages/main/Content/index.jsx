import React from 'react'
import Header from "../../../components/Header";
import ItemsList from "../ItemsList";

const Content = ({searchText, items, pageY, handleGoToBasket}) => {

    return (
        <div>
            <Header searchText={searchText}/>
            <div className={'content'}>
                <ItemsList items={items}
                           pageY={pageY}
                           handleGoToBasket={handleGoToBasket}
                />
            </div>
        </div>
    )
}

export default Content
