import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  options = ["BBC", "CNN", "Geo", "ARY", "DW", "Rt"];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private apiService: ApiService, private fb: FormBuilder) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
    this.getNames();
    
  }
  getNames() {
    this.apiService.getData().subscribe(response => {
      this.options = response;
    })
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
