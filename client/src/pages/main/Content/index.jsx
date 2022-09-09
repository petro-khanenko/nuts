import React, {useEffect} from 'react'
import Header from "../../../components/Header";
import ItemsList from "../ItemsList";
import {useScrollData} from "../../../context/ScrollContext";

const Content = () => {
    const {pageY} = useScrollData();

    useEffect(() => {
        window.scrollTo(0, pageY);
    }, [pageY]);

    return (
        <div>
            <Header/>
            <div className={'content'}>
                <ItemsList/>
            </div>
        </div>
    );
}

export default Content;
