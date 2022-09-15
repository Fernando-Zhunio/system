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