import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { from, Observable, Subscription } from 'rxjs';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]
})
export class AppComponent implements OnInit, OnDestroy {

  current_city_name: string = 'İstanbul'
  weather_data!: WeatherData;
  private weather_subscription!: Subscription;

  constructor(private weatherService: WeatherService, private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  ngOnDestroy(): void {
    if (this.weather_subscription) {
      this.weather_subscription.unsubscribe()
    }
  }

  lat: any;
  lng: any;

  ngOnInit(): void {
    this.getWeatherData(this.current_city_name);
  }
  weather_form: FormControl = this.formBuilder.control('', Validators.compose([Validators.required, Validators.maxLength(50)]))  

  get get_weather_form() {
      return this.weather_form
    }

    onFormSubmit() {
      console.log(this.lat, this.lng)
      this.getWeatherData(this.get_weather_form.value);
      this.current_city_name = ''
      this.get_weather_form.patchValue('')

    }
  private getWeatherData(cityName: string) {
    this.weather_subscription = this.weatherService.getWeatherData(cityName).subscribe({
      next: (response: WeatherData) => {
        this.weather_data = response;
        console.log(response)
      }
    })
  }
}
