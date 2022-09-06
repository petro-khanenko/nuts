import {setSuccessModal} from "../utils/swal/helpers";

export const getAddFieldsObject = (keysObj, valuesObj) => {
    const keysArr = Object.values(keysObj);
    const valuesArr = Object.values(valuesObj);
    return keysArr.reduce((result, key, idx) => ({ ...result, [key]: valuesArr[idx]}), {});
};
export const resetFormsStateHelper = (prevState) => {
    Object.keys(prevState).forEach(key => prevState[key] = '');
    return prevState;
};

export const getInitDynamicKeysForm = (company) => {
    if (company.addFields) {
        const array = Object.keys(company.addFields);
        return array.reduce((result, el, idx) => ({...result, [`itemKey${idx}`]: el}), {});
    }
    return {};
};
export const getInitDynamicValuesForm = (company) => {
    if (company.addFields) {
        const array = Object.values(company.addFields);
        return array.reduce((result, el, idx) => ({...result, [`itemValue${idx}`]: el}), {});
    }
    return {};
};

export const addItemToBasket = (item, someShit, setSomeShit) => {
    const basket = localStorage.getItem('basket');
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
    localStorage.setItem('basket', JSON.stringify(items));
    localStorage.setItem('items', Object.keys(items).length);
    setSomeShit(!someShit);
    setSuccessModal('Товар успішно доданий в корзину!');
};

