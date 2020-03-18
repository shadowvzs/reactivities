export interface IActivity {
    id?: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
    comments: IComments[];
}

export interface IComments {
    id: string;
    createdAt: Date,
    body: string;
    username: string;
    displayName: string;
    image: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
    public id?: string = undefined;
    public title: string = '';
    public description: string = '';
    public category: string = '';
    public date?: Date = undefined;
    public time?: Date = undefined;
    public city: string = '';
    public venue: string = '';

    constructor(init?: IActivityFormValues) {
        if (init && init.date) {
            init.time = init.date;
        }
        Object.assign(this, init);
    }
}

export interface IAttendee {
    username: string;
    displayName: string;
    image: string;
    isHost: boolean;
}