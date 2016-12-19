import { Injectable } from '@angular/core';
import { GenericDataService } from '../../../Common';

@Injectable()
export default class WeatherForRaceDayService {

    private genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    public getWeatherForRaceDay(raceDay:string): Promise<IWeatherForRaceDay> {
        return this.genericDataService.get<IWeatherForRaceDay>(`/api/weather/racedays/${raceDay}`);
    }
}