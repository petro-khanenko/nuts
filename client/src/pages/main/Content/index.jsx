import React from 'react'
import Header from "../../../components/Header";
import ItemsList from "../ItemsList";

const Content = ({ searchText, items }) => {

    return (
        <div>
            <Header searchText={searchText}/>
            <div className={'content'}>
                <ItemsList items={items}
                />
            </div>
        </div>
    )
}

export default Content
