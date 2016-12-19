import { Component, Input, OnInit } from '@angular/core';

@Component({
    templateUrl: 'HorseAnnualStatistics.tpl.html',
    selector: 'horse-annual-statistics'
})
export default class HorseAnnualStatisticsComponent {
    @Input()
    public model: IHorseStatisticsForYear;
}