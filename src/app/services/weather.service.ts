import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';

@Injectable()
export class WeatherService {

  constructor(private httpClient:HttpClient) { }

  getWeatherData(cityName:string):Observable<WeatherData>{
    return this.httpClient.get<WeatherData>(env.baseApiUrl,{
      headers: new HttpHeaders().set(env.XRapidAPIHostHeaderName,env.XRapidAPIHostHeaderValue).set(env.XRapidAPIKeyHeaderName, env.XRapidAPIKeyHeaderValue),
      params:new HttpParams().set('q',cityName).set('units','metric').set('mode','json')
    })
  }

}
