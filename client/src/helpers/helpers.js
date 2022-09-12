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

export const setToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const getItemsFromStorage = () => {
    return getFromStorage(localStorageKeys.BASKET) || {};
};

export const setItemsToStorage = (items) => {
    setToStorage(localStorageKeys.BASKET, items);
    setToStorage(localStorageKeys.ITEMS_COUNT, Object.keys(items).length);
};
