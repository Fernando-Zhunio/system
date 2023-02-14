import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from '../../../environments/environment';
import { Token } from '../../class/fast-data';
import { EchoOptions } from '../interfaces/echo-options';

@Injectable({
  providedIn: 'root'
})
export class SocketsManagerService {

  socketsConnections = new Map<string, Echo>();
  constructor() { }

  get(id: string): any | null {
    if (!this.socketsConnections.has(id)) {
      return null
    }
    return this.socketsConnections.get(id);
  }

  generate(id: string, options: EchoOptions): Echo {
    const optionEcho = this.generateOptionSocket(options);
    this.socketsConnections.set(id, new Echo(optionEcho));
    return this.socketsConnections.get(id)!;
  }

  deleteSocket(id: string, channelsNames: string[]) {
    channelsNames.forEach(name => {
      this.deleteChannel(id, name)
    });
    this.socketsConnections.delete(id);
  }

  deleteChannel(id: string, name: string) {
    this.socketsConnections.get(id)?.leave(name);
  }



  private generateOptionSocket(options: EchoOptions): EchoOptions {
    const defaultOptions = {
      broadcaster: 'pusher',
      cluster: 'mt1',
      key: environment.keySocket,
      authEndpoint: environment.server + 'broadcasting/auth',
      wsHost: environment.domain_serve,
      disableStats: true,
      encrypted: false,
      wsPort: environment.portSocket,
      wssPort: environment.portSocket,
      enabledTransports: ['ws', 'wss'],
      forceTLS: false,
      auth: {
        headers: {
          Authorization: 'Bearer ' + Token.getToken(),
        },
      },
    }

    return { ...defaultOptions, ...options };
  }



}
