import {swalWithCustom} from "./swalWithCustom";

export const setSuccessModal = (text, timer = 1000) => {
    swalWithCustom.fire({
        text: text,
        icon: 'success',
        showConfirmButton: false,
        timer: timer
    });
}

export const setInfoModal = (text, icon = 'success') => {
    swalWithCustom.fire({
        text: text,
        icon: icon
    });
}

export const setConfirmModal = (
    confirmText,
    infoText,
    handler,
    ...args
) => {
    swalWithCustom
        .fire({
            text: confirmText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Так',
            cancelButtonText: 'Ні'
        })
        .then((result) => {
            if (result.isConfirmed) {
                handler(...args);
                infoText && setSuccessModal(infoText);
            }
        });
};