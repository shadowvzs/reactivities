import { observable, action, computed, runInAction } from 'mobx';
import { IProfile, IPhoto } from '@models/Profile';
import service from '@service';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';

export default class ProfileStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = true;
    @observable uploadingPhoto = false;
    @observable loading = false;
    
    @computed get isCurrentUser() {
        const user = this.rootStore.userStore.user;
        return this.profile && user && this.profile.username === user.username;
    }

    @action loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await service.profile.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            });
        } catch (err) {
            console.error(err);
            runInAction(() => this.loadingProfile = false);
        }
    }
    
    @action uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const photo = await service.profile.uploadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    const user = this.rootStore.userStore.user;
                    this.profile.photos.push(photo);
                    if (photo.isMain && user) {
                        user.image = photo.url;
                        this.profile.image = photo.url;
                    }
                }
                this.uploadingPhoto = false;
            });
        } catch (err) {
            console.error(err);
            toast.error('Problem uploading photo');
            runInAction(() => this.uploadingPhoto = false );
        }
    }

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await service.profile.setMainPhoto(photo.id);
            runInAction(() => {
                this.rootStore.userStore.user!.image = photo.url;
                this.profile!.photos.find(a => a.isMain)!.isMain = false;
                this.profile!.photos.find(a => a.id === photo.id)!.isMain = true;
                this.profile!.image = photo.url;
                this.loading = false;
            });
        } catch (err) {
            console.error(err);
            toast.error('Problem changing main photo');
            runInAction(() => this.loading = false );
        }
    }

    @action deletePhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await service.profile.deletePhoto(photo.id);
            runInAction(() => {
                this.profile!.photos = this.profile!.photos.filter(x => x.id !== photo.id);
                this.loading = false;
            });
        } catch (err) {
            console.error(err);
            toast.error('Problem changing main photo');
            runInAction(() => this.loading = false );
        }
    }
}
