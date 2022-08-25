import Echo from 'laravel-echo';
import pusherJs from 'pusher-js';
import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';
window['Pusher'] = pusherJs;
export class EchoManager {

  public endpoint = environment.server;
  public domain_serve = environment.domain_serve;
  private port = environment.portSocket;


  constructor(public s_storage: StorageService) {}
  private  _echo = new Echo({
        broadcaster: 'pusher',
        cluster: 'mt1',
        key: environment.keySocket,
        authEndpoint: this.endpoint + 'broadcasting/auth',
        wsHost: this.domain_serve,
        disableStats: true,
        encrypted: false,
        wsPort: this.port,
        wssPort: this.port,
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        auth: {
            headers: {
                Authorization: 'Bearer ' + this.s_storage.getCurrentToken()
            },
        },
    });

    private  _chat_echo = new Echo({
        broadcaster: 'pusher',
        cluster: 'mt1',
        key: environment.keySocket,
        authEndpoint: this.endpoint + 'broadcasting/auth',
        wsHost: environment.domain_serve_chat,
        disableStats: true,
        encrypted: false,
        wsPort: environment.portSocket_chat,
        wssPort: environment.portSocket_chat,
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        auth: {
            headers: {
                Authorization: 'Bearer ' + this.s_storage.getCurrentToken()
            },
        },
    });

    public get echo() {
        return this._echo;
    }

    public set echo(echo) {
        this._echo = echo;
    }

    public get chat_echo() {
        return this._chat_echo;
    }

    public set chat_echo(echo) {
        this._chat_echo = echo;
    }
}

