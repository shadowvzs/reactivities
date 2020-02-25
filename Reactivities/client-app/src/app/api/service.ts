import axios, { AxiosResponse } from "axios";
import { IActivity } from "@models/Activity";

const API_URL = 'http://172.18.0.2:4999/api';

axios.defaults.baseURL = API_URL;

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

export default {
    activity: activityService
};
