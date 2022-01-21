import { INotification } from '../../interfaces/inotification';

export interface AppState {
    report: string;
    notifications: INotification[];
}
