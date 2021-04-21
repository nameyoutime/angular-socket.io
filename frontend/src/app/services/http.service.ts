import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  getHome() {
    return this.http.get<any>(environment.endpoint + "home");
  }

  setHome(message){
    return this.http.put<any>(environment.endpoint + "home",{
      message:message
    });
  }

}
