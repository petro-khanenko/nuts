import {setSuccessModal} from "../utils/swal/helpers";
import {localStorageKeys} from "../constants/constants";

export const getAddFieldsObject = (keysObj, valuesObj) => {
    const keysArr = Object.values(keysObj);
    const valuesArr = Object.values(valuesObj);
    return keysArr.reduce((result, key, idx) => ({ ...result, [key]: valuesArr[idx]}), {});
};
export const resetFormsStateHelper = (prevState) => {
    Object.keys(prevState).forEach(key => prevState[key] = '');
    return prevState;
};

export const getInitDynamicKeysForm = (item) => {
    if (item.addFields) {
        const array = Object.keys(item.addFields);
        return array.reduce((result, el, idx) => ({...result, [`itemKey${idx}`]: el}), {});
    }
    return {};
};
export const getInitDynamicValuesForm = (item) => {
    if (item.addFields) {
        const array = Object.values(item.addFields);
        return array.reduce((result, el, idx) => ({...result, [`itemValue${idx}`]: el}), {});
    }
    return {};
};

export const addItemToBasket = (item, someShit, setSomeShit) => {
    const basket = localStorage.getItem(localStorageKeys.BASKET);
    const parsedBasket = basket ? JSON.parse(basket) : {};
    const items = {
        ...parsedBasket, [item.name]: {
            image: item.image,
            name: item.name,
            price: item.price,
            points: item.points,
            count: 1,
            total: item.price,
            anchorr: item.anchorr
        }
    };
    localStorage.setItem(localStorageKeys.BASKET, JSON.stringify(items));
    localStorage.setItem(localStorageKeys.ITEMS, Object.keys(items).length);
    setSomeShit(!someShit);
    setSuccessModal('Товар успішно доданий в корзину!');
};

