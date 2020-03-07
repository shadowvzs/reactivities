import { configure } from 'mobx';
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import { createContext } from 'react';

// add strict mode
configure({ enforceActions: true });

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
    }
}

export default createContext(new RootStore());