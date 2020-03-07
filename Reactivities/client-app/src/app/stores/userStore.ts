import { observable, action, computed, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '@models/User';
import service from '@service';
import { RootStore } from './rootStore';
import { history } from "../..";

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
            runInAction(() => {
                this.user = user;
                history.push('/activities')
            });
        } catch (err) {
            throw err;
            console.error(err);
        }
    }
}
