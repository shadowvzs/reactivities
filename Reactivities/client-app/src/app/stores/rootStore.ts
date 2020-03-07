import { configure } from 'mobx';
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import { createContext } from 'react';
import CommonStore from './commonStore';

// add strict mode
configure({ enforceActions: true });

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore
    
    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export default createContext(new RootStore());