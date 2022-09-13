import React, {useState} from 'react'
import {IconButton, makeStyles} from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";
import IndeterminateCheckBox from "@material-ui/icons/IndeterminateCheckBox";
import Cancel from "@material-ui/icons/Cancel";
import {NavLink, useLocation} from "react-router-dom";
import {setConfirmModal} from "../../../../utils/swal/helpers";
import {useBasketData} from "../../../../context/BasketContext";
import {setToStorage} from "../../../../helpers/helpers";
import {localStorageKeys} from "../../../../constants/constants";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            minWidth: 35,
            float: 'right',
        },
        iconDecrease: {
            fontSize: 40,
            color: 'red',
        },
        iconIncrease: {
            fontSize: 40,
            color: 'green',
        },
    })
)

export const BasketItem = ({item}) => {

    const [counter, setCounter] = useState(item.count);
    const {iconDecrease, iconIncrease, iconButton} = useStyles();
    const {setCountAndTotalOfItem, removeItemFromBasket} = useBasketData();

    const {pathname} = useLocation();
    const handleSetPath = () => {
        setToStorage(localStorageKeys.PREV_PATH, pathname);
    };

    const removeItemHandler = () => {
        setConfirmModal(
            'Ви впевнені, що бажаєте видалити даний товар із корзини?',
            'Товар успішно видалений!',
            () => removeItemFromBasket(item)
        );
    };

    const countHandler = (value) => {
        const nextCounter = counter + value;
        const actualCounter = nextCounter === 0 ? 1 : nextCounter;
        setCounter(actualCounter);
        setCountAndTotalOfItem(actualCounter, item);
    }

    return (
        <div className={'basket_item'}>
            <div className="basket_item__image">
                <NavLink
                    to={`/about/${item.anchorr}`}
                    onClick={handleSetPath}
                >
                    <img src={item.image} alt="image"/>
                </NavLink>
            </div>
            <NavLink
                to={`/about/${item.anchorr}`}
                className={'basket_item__name'}
                onClick={handleSetPath}
            >
                <div>{item.name}</div>
            </NavLink>
            <div>{Number(item.price).toFixed(2)} грн / {item.points}</div>
            <div className='basket_item__counter'>
                <IconButton className={iconButton}
                            onClick={() => countHandler(-1)}
                            disabled={counter === 1}
                >
                    <IndeterminateCheckBox className={iconDecrease}/>
                </IconButton>
                <div className='basket_item__counter-number'>{item.count}</div>
                <IconButton className={iconButton} onClick={() => countHandler(1)}>
                    <AddBox className={iconIncrease}/>
                </IconButton>
            </div>
            <div>{Number(item.total).toFixed(2)} грн</div>
            <div className="basket_item__cancel_button">
                <IconButton className={iconButton} onClick={removeItemHandler}>
                    <Cancel className={iconDecrease}/>
                </IconButton>
            </div>
        </div>
    );
}
