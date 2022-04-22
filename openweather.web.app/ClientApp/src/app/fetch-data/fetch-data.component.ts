import { Component, Inject, OnInit, Renderer2  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

declare const google;

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {

  SearchPlacesForm: NgForm;
  public shippingAddress: string;

  public forecasts: WeatherForecast[];
  options = ["BBC", "CNN", "Geo", "ARY", "DW", "Rt"];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private apiService: ApiService, private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document, private renderer2: Renderer2  ) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
    this.getNames();
    
  }
  private loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.text = ``;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      this.renderer2.appendChild(this.document.head, script);
    })
  }

  initAutocomplete() {
    const input = document.getElementById("txtSearchPlaces") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields([
      "address_components",
      "geometry",
      "icon",
      "name"
    ]);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        alert('No details available for input:' + input.value);
        return;
      } else {
        return;
      }
    });
  }
    ngOnInit(): void {
      this.loadAutoComplete();
  }
  private loadAutoComplete() {
    const url = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&v=weekly';
    this.loadScript(url).then(() => this.initAutocomplete());
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
