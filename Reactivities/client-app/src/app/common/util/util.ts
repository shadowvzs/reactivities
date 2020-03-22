import { IActivity, IAttendee } from "@models/Activity";
import { IUser } from "@models/User";

export const combineDateAndTime = (date: Date, time: Date): Date => {
    // const timeString = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0') + ':00';
    // const dateString = date.getFullYear() + ' ' + date.getMonth().toString().padStart(2, '0') + ' ' + date.getDate().toString().padStart(2, '0');
    // return new Date(dateString + ' ' + timeString);
    const dateString = date.toISOString().split('T')[0];
    const timeString = time.toISOString().split('T')[1];
    return new Date(dateString + 'T' + timeString);
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date!);
    activity.isHost = activity.attendees.some(x => user && x.isHost && x.username === user.username);
    activity.isGoing = activity.attendees.some(x => user && x.username === user.username);
    return activity;
};

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    }
};