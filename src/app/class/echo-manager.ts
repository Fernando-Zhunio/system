import Echo from 'laravel-echo';
import pusherJs from 'pusher-js';
import { environment } from '../../environments/environment';
// import { StorageService } from '../services/storage.service';
import { Token } from './fast-data';
window['Pusher'] = pusherJs;

export class EchoManager {

  private endpoint = environment.server + 'broadcasting/auth';
  public domain_serve = environment.domain_serve;
  private port = environment.portSocket;

  private echoOptionsDefault: EchoOptions = {
        broadcaster: 'pusher',
        cluster: 'mt1',
        key: environment.keySocket,
        authEndpoint: this.endpoint,
        wsHost: this.domain_serve,
        disableStats: true,
        encrypted: false,
        wsPort: this.port,
        wssPort: this.port,
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        auth: {
            headers: {
                Authorization: 'Bearer ' + Token.getInstance().getToken(),
            },
        },
  }

  private _echo = new Echo(this.echoOptionsDefault);

    public get(): Echo{
        return this._echo;
    }

    public set(options: EchoOptions) {
        this.echoOptionsDefault = {...this.echoOptionsDefault,...options};
        return this;
    }

    // public setDomain(domain: string) {
    //     this.domain_serve = domain;
    //     return this;
    // }

    // public setEndpoint(endpoint: string) {
    //     this.endpoint = endpoint;
    //     return this;
    // }

    // private  _chat_echo = new Echo({
    //     broadcaster: 'pusher',
    //     cluster: 'mt1',
    //     key: environment.keySocket,
    //     authEndpoint: this.endpoint + 'broadcasting/auth',
    //     wsHost: environment.domain_serve_chat,
    //     disableStats: true,
    //     encrypted: false,
    //     wsPort: environment.portSocket_chat,
    //     wssPort: environment.portSocket_chat,
    //     enabledTransports: ['ws', 'wss'],
    //     forceTLS: false,
    //     auth: {
    //         headers: {
    //             Authorization: 'Bearer ' + Token.getInstance().getToken()
    //         },
    //     },
    // });

    // public get echo() {
    //     return this._echo;
    // }

    // public set echo(echo) {
    //     this._echo = echo;
    // }

    // public get chat_echo() {
    //     return this._chat_echo;
    // }

    // public set chat_echo(echo) {
    //     this._chat_echo = echo;
    // }
}

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

