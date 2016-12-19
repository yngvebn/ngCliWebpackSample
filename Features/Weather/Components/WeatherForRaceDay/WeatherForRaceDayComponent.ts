import { Component, Input, OnInit } from '@angular/core';
import WeatherForRaceDayService from './WeatherForRaceDayService';

@Component({
    selector: 'weather-for-race-day',
    templateUrl: 'WeatherForRaceDay.tpl.html'
})
export default class WeatherForRaceDayComponent implements OnInit {
    @Input()
    public raceDay: string;
    public weather:IWeatherForRaceDay;

    constructor(private weatherForRaceDayService: WeatherForRaceDayService) {
    
    }

    ngOnInit(): void {
        this.weatherForRaceDayService.getWeatherForRaceDay(this.raceDay).then((response: IWeatherForRaceDay) => {
            this.weather = response;
        });
    }
}