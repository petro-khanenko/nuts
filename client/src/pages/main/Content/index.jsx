import React, {useEffect} from 'react';
import {useScrollData} from "../../../context/ScrollContext";
import Header from "../../../components/Header";
import ItemsList from "../ItemsList";
import Filters from "../Filters";

const Content = () => {
    const {pageY} = useScrollData();
    useEffect(() => {
        window.scrollTo(0, pageY);
    }, [pageY]);

    return (
        <div>
            <Header/>
            <div className={'content'}>
                <Filters />
                <ItemsList/>
            </div>
        </div>
    );
}

export default Content;
