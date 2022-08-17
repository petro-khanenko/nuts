import Swal from "sweetalert2";

export const swalWithCustom = Swal.mixin({
    customClass: {
        container: 'swal-container',
        htmlContainer: 'swal-text',
        confirmButton: 'btn btn-confirm',
        cancelButton: 'btn btn-cancel',
    },
    buttonsStyling: false,
});
