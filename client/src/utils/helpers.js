import {uploadImageToImgur} from "./imgur";
import {swalWithCustom} from "./swal/swalWithCustom";

export const getStringFromFile = (files)=> {
    return new Promise((resolve) => {
        if (!files || !files[0]) {
            return;
        }
        const reader = new FileReader();
        const file = files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = reader.result;
            const result = image.slice(image.search(/[^,]*$/));
            resolve(result);
        };
    });
};

export const fileSelectorHandler = (setForm) => (files) => {
    getStringFromFile(files)
        .then((str) => uploadImageToImgur(str))
        .then((res) => {
            if (res.data.status === 200) {
                setForm(prev => ({...prev, image: res.data.data.link}));
            }
        });
};

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
    swalWithCustom.fire({
        text: 'Товар успішно доданий в корзину!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
    });
};

