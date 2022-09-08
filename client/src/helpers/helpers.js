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

export const getItemsFromStorage = () => {
    return JSON.parse(localStorage.getItem(localStorageKeys.BASKET)) || {};
};

export const setItemsToStorage = (items) => {
    localStorage.setItem(localStorageKeys.BASKET, JSON.stringify(items));
    localStorage.setItem(localStorageKeys.ITEMS, JSON.stringify(Object.keys(items).length));
};