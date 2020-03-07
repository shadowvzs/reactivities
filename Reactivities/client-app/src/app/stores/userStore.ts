import { observable, action, computed, configure } from 'mobx';
import { IUser, IUserFormValues } from '@models/User';
import service from '@service';
import { RootStore } from './rootStore';

// add strict mode
configure({ enforceActions: true });

export default class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user;
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await service.user.login(values);
            this.user = user;
        } catch (err) {
            console.error(err);
        }
    }
}
