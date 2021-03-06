import { observable, action, computed, runInAction } from 'mobx';
import { IUser, IUserFormValues } from 'src/app/models/User';
import service from 'src/app/api/service';
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
            });
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities')
        } catch (err) {
            throw err;
        }
    }

    @action register = async (values: IUserFormValues) => {
        try {
            const user = await service.user.register(values);
            runInAction(() => {
                this.user = user;
            });
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities')
        } catch (err) {
            throw err;
        }
    }

    @action getUser = async () => {
        try {
            const user = await service.user.current();
            runInAction(() => {
                this.user = user;
            });
        } catch (err) {
            throw err;
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/')
    }
}
