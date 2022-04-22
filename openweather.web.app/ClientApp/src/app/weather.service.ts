import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeather() {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=Nairobi&APPID=API_KEY')
      .pipe(map(data => { })).subscribe(result => {
      console.log(result);
    });
  }
  private handleError(error: Response | any) {
    const message = error.json().message;
    return Observable.throw(message);
  }
}