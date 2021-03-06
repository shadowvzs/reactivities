import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import RootStoreContext from "src/app/stores/rootStore";

 
const ModalModalExample = () => {
    const { modalStore } = useContext(RootStoreContext);
    const { modal: { open, body }, closeModal } = modalStore;

    return (
        <Modal open={open} onClose={closeModal} size='mini'>
            <Modal.Content>
                {body}
            </Modal.Content>
        </Modal>
    )
};

export default observer(ModalModalExample);