import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  listen(eventName: string) {
    return new Observable((subcriber) => {
      this.socket.on(eventName, (data) => {
        subcriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
