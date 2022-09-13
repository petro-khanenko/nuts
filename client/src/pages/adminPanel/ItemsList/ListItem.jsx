import React from 'react';
import StoreItem from "../../../components/StoreItem";
import {Button, makeStyles} from "@material-ui/core";
import {apiRoutes, apiSubRoutes} from "../../../constants/constants";
import {setConfirmModal, setInfoModal, setSuccessModal} from "../../../utils/swal/helpers";
import {useHttp} from "../../../hooks/http.hook";

const useStyles = makeStyles((theme) => ({
        updateButton: {
            marginRight: '10px'
        }
    })
);

const ListItem = ({item, idx, onUpdateItem, fetchItems}) => {
    const {updateButton} = useStyles();
    const { request } = useHttp();

    const deleteItemRequest = async () => {
        try {
            const data = await request(`/${apiRoutes.ITEMS}/${apiSubRoutes.DELETE}`, 'DELETE', { id: item._id})
            if (data.status === 'success') {
                setSuccessModal('Товар успішно видалено!');
                fetchItems();
            }
        } catch (e) {
            setInfoModal(
                'На жаль, під час видалення товару сталася помилка. Повторіть, будь ласка, спробу!',
                'warning'
            );
        }
    };
    const handleDeleteItem = () => {
        setConfirmModal(
            'Ви впевнені, що бажаєте видалити даний товар?',
            null,
            deleteItemRequest
        );
    };

    return (
        <StoreItem
            item={item}
            idx={idx}
        >
            <div>
                <Button
                    variant='contained'
                    color='primary'
                    className={updateButton}
                    onClick={() => onUpdateItem(item)}
                >
                    Update
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleDeleteItem}
                >
                    Delete
                </Button>
            </div>
        </StoreItem>
    );
}

export default ListItem;
