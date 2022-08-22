import React, {useState} from 'react'
import {IconButton, makeStyles} from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";
import IndeterminateCheckBox from "@material-ui/icons/IndeterminateCheckBox";
import Cancel from "@material-ui/icons/Cancel";
import {swalWithCustom} from "../../../../utils/swal/swalWithCustom";
import {NavLink} from "react-router-dom";

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

export const BasketItem = ({item, someShit, setSomeShit}) => {

    const [counter, setCounter] = useState(item.count);
    const {iconDecrease, iconIncrease, iconButton} = useStyles();

    const setCountAndTotalOfItem = (actualCounter) => {
        const basket = localStorage.getItem('basket');
        const parsedBasket = basket ? JSON.parse(basket) : {}
        const items = {
            ...parsedBasket, [item.name]: {
                image: item.image,
                name: item.name,
                price: item.price,
                points: item.points,
                count: actualCounter,
                total: item.price * actualCounter,
                anchorr: item.anchorr
            }
        };
        localStorage.setItem('basket', JSON.stringify(items));
        setSomeShit(!someShit);
    };

    const removeItemFromBasket = () => {
        const basket = localStorage.getItem('basket');
        const parsedBasket = basket ? JSON.parse(basket) : {};
        delete parsedBasket[item.name];
        localStorage.setItem('basket', JSON.stringify(parsedBasket));
        localStorage.setItem('items', Object.keys(parsedBasket).length)
        setSomeShit(!someShit);
    }

    const removeItemHandler = () => {
        swalWithCustom
            .fire({
                text: 'Ви впевнені, що бажаєте видалити даний товар із корзини?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Так',
                cancelButtonText: 'Ні'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    removeItemFromBasket();
                    swalWithCustom.fire({
                        text: 'Товар успішно видалений!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    const countHandler = (value) => {
        const nextCounter = counter + value;
        const actualCounter = nextCounter === 0 ? 1 : nextCounter;
        setCounter(actualCounter);
        setCountAndTotalOfItem(actualCounter);
    }

    return (
        <div className={'basket_item'}>
            <div className="basket_item__image">
                <NavLink to={`/about/${item.anchorr}`}>
                    <img src={item.image} alt="image"/>
                </NavLink>
            </div>
            <NavLink to={`/about/${item.anchorr}`} className={'basket_item__name'}>
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
