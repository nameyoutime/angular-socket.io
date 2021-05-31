import { Component, OnInit } from '@angular/core';

import { HttpService } from './services/http.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public data: any;
  async ngOnInit() {
    this.data = await this.httpSer.getHome().toPromise();
    //listen to event from the socket.io server
    this.websocket.listen('message').subscribe((data) => {
      this.data = data;
    });
  }
  constructor(private websocket: WebsocketService, private httpSer: HttpService) { }

  check() {
    console.log(this.data);
  }

  async save(message) {
    await this.httpSer.setHome(message).toPromise();
    this.websocket.emit('message', message);
  }
}
