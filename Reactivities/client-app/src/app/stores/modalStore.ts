import { observable, action } from 'mobx';
import { RootStore } from './rootStore';

export default class ModalStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable.shallow modal = {
        open: false,
        body: null as null | string | JSX.Element
    }

    @action openModal = (content: string | JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}
