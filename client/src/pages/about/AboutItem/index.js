import React, {useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {Button} from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {useBasketData} from "../../../context/BasketContext";

const AboutItem = ({ item = {}, getItemForAboutPage}) => {

    const { anchor } = useParams();
    const {addItemToBasket} = useBasketData();

    useEffect(() => {
        getItemForAboutPage(anchor);
    }, [anchor, item]);

    if (!item) return <h2>Loading...</h2>

    return (
        <div className='about_item'>
            <div className='basket_go-back-button'>
                <NavLink to={`/#${anchor}`}>
                    <Button startIcon={<ArrowBackIos/>}
                            variant='contained'
                            size='large'
                            color='secondary'
                    >
                        До списку товарів
                    </Button>
                </NavLink>
            </div>
            <h2 className='about_item_title'>Опис товару</h2>
            <div className='about_item_content'>
                <div className="about_item__image">
                    <img src={item.image} alt="Image not found"/>
                </div>
                <div className='about_item__description'>
                    <div><b>Найменування: </b> {item.name}</div>
                    <div><b>Ціна: </b> {Number(item.price).toFixed(2)} грн/{item.points}</div>
                    {
                        item.addFields && Object.entries(item.addFields).map(([key, value]) => (
                                <div><b>{key}: </b> {value}</div>
                            )
                        )
                    }
                    <div><b>Детальніше про товар та його переваги: </b><br/> {item.description}</div>
                </div>
            </div>
            <div className="about_item__buttons">
                <NavLink to='/basket'>
                    <Button variant='contained' color='secondary'
                            onClick={() => addItemToBasket(item)}>
                        Купити
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}

export default AboutItem
