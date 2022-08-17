import React from 'react'
import Header from "../../../components/Header/Header";
import CompaniesList from "../CompamiesList/CompaniesList";

const Content = ({ searchText, companies, pageY, handleGoToBasket, someShit, setSomeShit }) => {

    return (
        <div>
            <Header searchText={searchText}/>
            <div className={'content'}>
                <CompaniesList companies={companies}
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
