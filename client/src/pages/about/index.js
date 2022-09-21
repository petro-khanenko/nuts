import React, {useEffect} from "react";
import {NavLink, useLocation, useParams} from "react-router-dom";
import {Button} from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {useBasketData} from "../../context/BasketContext";
import {localStorageKeys, mainRoutes, subRoutes} from "../../constants/constants";
import {useItemsData} from "../../context/ItemsContext";
import {getFromStorage, setToStorage} from "../../helpers/helpers";

const AboutItem = () => {
    const { anchor } = useParams();
    const { onGetItem } = useItemsData();
    const {addItemToBasket} = useBasketData();

    useEffect(() => {
        onGetItem(anchor);
    }, [anchor]);

    const getPrevLocation = () => {
        const prevPath = getFromStorage(localStorageKeys.PREV_PATH);
        switch (true) {
            case prevPath.includes(subRoutes.ADMIN_BASKET):
                return `/${mainRoutes.ADMIN}/${subRoutes.PANEL}/${subRoutes.ADMIN_BASKET}`;
            case prevPath.includes(mainRoutes.ADMIN):
                return `/${mainRoutes.ADMIN}/${subRoutes.PANEL}`;
            case prevPath.includes(mainRoutes.BASKET):
                return `/${mainRoutes.BASKET}`;
            default:
                return `/#${anchor}`;
        }
    };

    const item = onGetItem(anchor);

    if (!item) return <h2>Loading...</h2>

    return (
        <div className='about_item'>
            <div className='basket__go-back-button'>
                <NavLink to={getPrevLocation()}>
                    <Button startIcon={<ArrowBackIos/>}
                            variant='contained'
                            size='large'
                            color='secondary'
                            onClick={() => setToStorage(localStorageKeys.PREV_PATH, '')}
                    >
                        До списку товарів
                    </Button>
                </NavLink>
            </div>
            <h2 className='about-item__title'>Опис товару</h2>
            <div className='about-item__content'>
                <div className="about-item__image">
                    <img src={item.image} alt="Image not found"/>
                </div>
                <div className='about-item__description'>
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
            <div className="about-item__buttons">
                <NavLink to={`/${mainRoutes.BASKET}`}>
                    <Button variant='contained' color='secondary'
                            onClick={() => addItemToBasket(item)}>
                        Купити
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}

export default AboutItem;
