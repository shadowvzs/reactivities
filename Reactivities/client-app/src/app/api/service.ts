import axios, { AxiosResponse } from "axios";
import { IActivity } from "@models/Activity";
import { IUser, IUserFormValues } from "@models/User";
import { history } from "../..";
import { toast } from "react-toastify";

const API_URL = 'http://172.18.0.2:4999/api';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(( config ) => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// we have access for error informations
// example error.response.data.errors
axios.interceptors.response.use(undefined, error => {
    // backend if send 404 error when entity not found with RestError handler
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!');
    }
    const { status, data, config } = error.response;
    if (status === 404) {
        history.push('/notfound');
    // if guid is invalid
    } else if (status === 400 && config.method === 'get' && data.errors.id) {
        history.push('/notfound');
    } else if (status === 500) {
        toast.error('Server error - check the terminal for more info!');
    }
    
    throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

// how to implement sleep for testing the loader
// old: get: (url: string) => axios.get(url).then(responseBody),
// new: get: (url: string) => axios.get(url).then(sleep(3000)).then(responseBody),

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const activityService = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post(`/activities`, activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
};

const userService = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user),
};

export default {
    activity: activityService,
    user: userService,
};
