import { observable, action, computed, runInAction, reaction } from 'mobx';
import { IProfile, IPhoto } from '@models/Profile';
import service from '@service';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';

export default class ProfileStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(() => this.activeTab, (activeTab) => {
            if (activeTab === 3 || activeTab === 4) {
                const predicate = activeTab === 4 ? 'following' : 'followers';
                this.loadFollowings(predicate);
            } else {
                this.followings = [];
            }
        });
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = true;
    @observable uploadingPhoto = false;
    @observable loading = false;
    @observable followings: IProfile[] = [];
    @observable activeTab: number = 0;
    
    @computed get isCurrentUser() {
        const user = this.rootStore.userStore.user;
        return this.profile && user && this.profile.username === user.username;
    }

    @action setActiveTab = (activeIndex: number) => {
        this.activeTab = activeIndex;
    };

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

    @action updateProfile = async (profile: Partial<IProfile>) => {
        this.loading = true;
        try {
            await service.profile.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName !== this.rootStore.userStore.user!.displayName) {
                    this.rootStore.userStore.user!.displayName = profile.displayName!;
                }
                this.profile = {...this.profile!, ...profile};
            });
        } catch (err) {
            console.error(err);
            toast.error('Problem changing main photo');
            runInAction(() => this.loading = false );
        }
    }

    @action unfollow = async (username: string) => {
        this.loading = true;
        try {
            await service.profile.unfollow(username);
            runInAction(() => {
                this.profile!.following = false;
                this.profile!.followersCount--;
                this.loading = false;
            });
        } catch (err) {
            toast.error('Problem unfollowing user');
            runInAction(() => {
                this.loading = false;
            });
        }
    };


    @action follow = async (username: string) => {
        this.loading = true;
        try {
            await service.profile.follow(username);
            runInAction(() => {
                this.profile!.following = true;
                this.profile!.followersCount++;
                this.loading = false;
            });
        } catch (err) {
            toast.error('Problem following user');
            runInAction(() => {
                this.loading = false;
            });
        }
    };


    @action loadFollowings = async (predicate: string) => {
        this.loading = true;
        try {
            const profiles = await service.profile.listFollowings(this.profile!.username, predicate);
            runInAction(() => {
                this.followings = profiles;
                this.loading = false;
            });
        } catch (err) {
            toast.error('Problem loading following user profiles');
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
