import {uploadImageToImgur} from "./imgur";

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
