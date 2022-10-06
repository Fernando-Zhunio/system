export class Token {
    private static token: string;

    static get getToken(): string {
        return this.token;
    }

    static set setToken(token: string) {
        this.token = token;
    }
}

export class User {
    private static user: User;

    static get getUser(): User {
        return this.user;
    }

    static set setUser(user: User) {
        this.user = user;
    }
}

export class Preferences {
    private static preferences: Map<string, any> = new Map();

    static get getPreferences(): Map<string, any> {
        return this.preferences;
    }

    static set setPreferences(preferences: Map<string, any>) {
        this.preferences = preferences;
    }
}

export const PATH_LOGIN = '/authentication/login';
