import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from '../environments/environment';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeatherO() {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=Nairobi&APPID=API_KEY')
      .pipe(map(data => { })).subscribe(result => {
      console.log(result);
    });
  }
  getWeather(city: string): Observable<Weather> {
    const options = new HttpParams()
      .set('units', 'metric')
      .set('q', city)
      .set('appId', environment.apiKey);
    console.log(environment.apiUrl + 'weather' + environment.apiKey)
    return this.http.get<Weather>(environment.apiUrl + 'weather', { params: options });
  }
  private handleError(error: Response | any) {
    const message = error.json().message;
    return Observable.throw(message);
  }
}
