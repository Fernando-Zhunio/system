import { PreferencesTypes } from "../core/enums/preferences-types";
import { Preferences as IPreferences } from "../core/interfaces/preferences";
import { Person } from "../shared/interfaces/person";
import { User as IUser } from "../shared/interfaces/user";

export class Token {
    private static instance: Token;
    private token: string | null = null ;
    // private static token: string;
    private constructor() {}

    static getInstance(): Token {
        if (!this.instance) {
            this.instance = new Token();
        }
        return this.instance;
    }

    getToken(): string | null {
        return this.token;
    }

    setToken(token: string) {
        this.token = token;
    }
}

export class User {
    private static instance: User;
    id: number;
    name: string;
    email: string;
    person: Person;
    private constructor() { }
    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }
}

export function fillUser(user: IUser): void {
    User.getInstance().id = user.id;
    User.getInstance().name = user.name;
    User.getInstance().email = user.email;
    User.getInstance().person = user.person;
}


export class Preferences {
    private static preferences: Preferences;
    private preferences: IPreferences = {
        general_notification_email: 'off',
        general_notification_sound: 'off',
        general_notification_webpush: 'off',
        general_notification_whatsapp: 'off',
        dashboard_dates: null,
        [PreferencesTypes.FAVORITES_ITEMS_NAV]: [],
        enable_notifications_popup: false
    };
    
    private constructor() { }

    public static getInstance(): Preferences {
        if (!Preferences.preferences) {
            Preferences.preferences = new Preferences();
        }
        return Preferences.preferences;
    }

    get(): IPreferences {
        return this.preferences;
    }

    set(preferences: IPreferences): void {
        this.preferences = preferences;
    }
}

//     // static get getPreferences(): Map<string, any> {
//     //     return this.preferences;
//     // }

//     // static set setPreferences(preferences: Map<string, any>) {
//     //     this.preferences = preferences;
//     // }
// }

export const PATH_LOGIN = '/authentication/login';
export const LINK_IMAGE_LETTER = 'https://ui-avatars.com/api/?background=random&name='
