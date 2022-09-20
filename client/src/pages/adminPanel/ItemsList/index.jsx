import React, {useState} from 'react';
import ListItem from "./ListItem";
import {Modal} from "../../../components/modals/Modal";
import UpdateItemProvider from "./UpdateItemProvider";
import ItemForm from "../../../components/ItemForm";

const ItemsList = ({items, fetchItems}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemForModal, setItemForModal] = useState({});

    const handleUpdateItem = (item) => {
        setItemForModal(item)
        setModalOpen(true)
    }

    return (
        <>
            {
                isModalOpen && (
                    <Modal
                        title='Оновлення товару'
                        onCancel={() => setModalOpen(false)}
                    >
                        <UpdateItemProvider
                            item={itemForModal}
                            fetchItems={fetchItems}
                        >
                            <ItemForm/>
                        </UpdateItemProvider>
                    </Modal>
                )
            }
            <h2>Delete or Update Item</h2>
            <div className='admin_store'>
                <div className='admin_store__header'>
                    <div>№</div>
                    <div>товар</div>
                    <div>ціна</div>
                </div>
                <div>
                    {items.map((item, idx) => <ListItem item={item}
                                                        idx={idx}
                                                        onUpdateItem={handleUpdateItem}
                                                        fetchItems={fetchItems}
                    />)}
                </div>
            </div>
        </>
    );
}

export default ItemsList;
