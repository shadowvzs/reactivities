import { configure, observable, action } from 'mobx';
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import { createContext } from 'react';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';

// add strict mode
configure({ enforceActions: true });

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    
    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
    }
}

export default createContext(new RootStore());