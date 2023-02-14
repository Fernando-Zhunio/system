export interface EchoOptions {
    broadcaster?: string;
    cluster?: string;
    key?: string;
    authEndpoint?: string;
    wsHost: string;
    disableStats?: boolean;
    encrypted?: boolean;
    wsPort: number;
    wssPort: number;
    enabledTransports?: string[];
    forceTLS?: boolean;
    auth?: {
        headers: {
            Authorization: string;
        };
    };
}